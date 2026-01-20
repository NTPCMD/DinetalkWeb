// api/retell-webhook.ts
// Vercel Serverless Function: receives Retell webhook events and writes to Supabase using service role.
// IMPORTANT: Set env vars in Vercel (Production + Preview):
// - SUPABASE_URL
// - SUPABASE_SERVICE_ROLE_KEY
//
// The portal (client) should NOT call Retell directly or use the service role key.

export const config = {
  api: { bodyParser: true },
};

type RetellWebhookPayload = {
  event?: string;
  status?: string;
  error?: string | null;

  call_id?: string;
  retell_call_id?: string;

  from_number?: string;
  to_number?: string;

  started_at?: string;
  ended_at?: string;
  duration_seconds?: number;

  transcript?: string;
  recording_url?: string;

  // Some providers nest call info:
  call?: {
    call_id?: string;
    from_number?: string;
    to_number?: string;
    start_timestamp?: string;
    end_timestamp?: string;
    duration_seconds?: number;
    call_status?: string;
    recording_url?: string;
    transcript?: string;
    [k: string]: any;
  };

  // Allow unknown fields
  [k: string]: any;
};

function normalizeE164(n?: string | null) {
  if (!n) return null;

  // Remove spaces, dashes, parentheses, etc. Keep digits and leading +
  let cleaned = String(n).trim().replace(/[^\d+]/g, "");

  // Convert 00 prefix to + (sometimes numbers come as 0061...)
  if (cleaned.startsWith("00")) cleaned = "+" + cleaned.slice(2);

  // Ensure + if it's just digits (best effort)
  if (!cleaned.startsWith("+") && /^\d+$/.test(cleaned)) cleaned = "+" + cleaned;

  return cleaned || null;
}

function getSupabaseEnv() {
  const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SERVICE_ROLE) {
    throw new Error("Missing SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY");
  }

  return { SUPABASE_URL, SERVICE_ROLE };
}

async function supabaseFetch(
  url: string,
  serviceRole: string,
  init?: RequestInit
): Promise<Response> {
  return fetch(url, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      apikey: serviceRole,
      Authorization: `Bearer ${serviceRole}`,
    },
  });
}

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const payload: RetellWebhookPayload =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const { SUPABASE_URL, SERVICE_ROLE } = getSupabaseEnv();

    const toRaw = payload.to_number || payload.to || payload?.call?.to_number;
    const fromRaw = payload.from_number || payload.from || payload?.call?.from_number;

    const toNumber = normalizeE164(toRaw);
    const fromNumber = normalizeE164(fromRaw);

    // Identify restaurant by to_number matching restaurants.retell_phone_number
    // (You store E.164 format like +61860104462, so normalization is critical.)
    let restaurant_id: string | null = null;

    if (toNumber) {
      const r = await supabaseFetch(
        `${SUPABASE_URL}/rest/v1/restaurants?select=id,retell_phone_number&retell_phone_number=eq.${encodeURIComponent(toNumber)}&limit=1`,
        SERVICE_ROLE
      );

      const data = await r.json();
      const restaurant = Array.isArray(data) ? data[0] : null;
      restaurant_id = restaurant?.id ?? null;
    }

    // Write webhook event (always)
    await supabaseFetch(`${SUPABASE_URL}/rest/v1/webhook_events`, SERVICE_ROLE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        source: "retell",
        received_at: new Date().toISOString(),
        to_number: toNumber ?? null,
        from_number: fromNumber ?? null,
        restaurant_id,
        status: payload.event ?? payload.status ?? payload?.call?.call_status ?? null,
        error: payload.error ?? null,
        // IMPORTANT: store as JSON object so it stays jsonb in Supabase
        payload,
      }),
    });

    // Upsert call_logs by retell_call_id (you have a unique constraint on it)
    const retell_call_id =
      payload.retell_call_id || payload.call_id || payload?.call?.call_id || null;

    if (retell_call_id && restaurant_id) {
      const startedAt =
        payload.started_at || payload?.call?.start_timestamp || new Date().toISOString();

      const endedAt = payload.ended_at || payload?.call?.end_timestamp || null;

      const duration =
        payload.duration_seconds ?? payload?.call?.duration_seconds ?? null;

      const status =
        payload.event ?? payload.status ?? payload?.call?.call_status ?? null;

      const recordingUrl =
        payload.recording_url ?? payload?.call?.recording_url ?? null;

      const transcript = payload.transcript ?? payload?.call?.transcript ?? null;

      await supabaseFetch(
        `${SUPABASE_URL}/rest/v1/call_logs?on_conflict=retell_call_id`,
        SERVICE_ROLE,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Prefer: "resolution=merge-duplicates,return=minimal",
          },
          body: JSON.stringify({
            restaurant_id,
            retell_call_id,
            from_number: fromNumber ?? null,
            to_number: toNumber ?? null,
            started_at: startedAt,
            ended_at: endedAt,
            duration_seconds: duration,
            status,
            recording_url: recordingUrl,
            transcript,
            raw_payload: payload,
            // created_at exists on the table; if default exists, you can remove this.
            created_at: new Date().toISOString(),
          }),
        }
      );
    }

    // Retell expects a fast 2xx response.
    return res.status(200).json({
      ok: true,
      restaurant_id,
      matched_to_number: toNumber,
    });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "Webhook error" });
  }
}
