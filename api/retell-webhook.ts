export const config = {
  api: { bodyParser: true },
};

type RetellWebhookPayload = {
  event?: string;
  call_id?: string;
  retell_call_id?: string;
  from_number?: string;
  to_number?: string;
  started_at?: string;
  ended_at?: string;
  duration_seconds?: number;
  transcript?: string;
  recording_url?: string;
  [k: string]: any;
};

function getSupabaseEnv() {
  const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SERVICE_ROLE) {
    throw new Error("Missing SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY");
  }
  return { SUPABASE_URL, SERVICE_ROLE };
}

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    const payload: RetellWebhookPayload =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const { SUPABASE_URL, SERVICE_ROLE } = getSupabaseEnv();

    const toNumber = payload.to_number || payload.to || payload?.call?.to_number;
    const fromNumber = payload.from_number || payload.from || payload?.call?.from_number;

    // Find restaurant by to_number matching restaurants.retell_phone_number
    // (your README says it maps restaurants by retell_phone_number) :contentReference[oaicite:1]{index=1}
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/restaurants?select=id,retell_phone_number&retell_phone_number=eq.${encodeURIComponent(
        String(toNumber || "")
      )}&limit=1`,
      {
        headers: {
          apikey: SERVICE_ROLE,
          Authorization: `Bearer ${SERVICE_ROLE}`,
        },
      }
    );

    const restaurants = await r.json();
    const restaurant = restaurants?.[0];
    const restaurant_id = restaurant?.id ?? null;

    // Always store raw event
    await fetch(`${SUPABASE_URL}/rest/v1/webhook_events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SERVICE_ROLE,
        Authorization: `Bearer ${SERVICE_ROLE}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        source: "retell",
        received_at: new Date().toISOString(),
        to_number: toNumber ?? null,
        from_number: fromNumber ?? null,
        restaurant_id,
        status: payload.event ?? payload.status ?? null,
        error: payload.error ?? null,
        payload,
      }),
    });

    // Upsert call_logs by retell_call_id (you have a unique key on it)
    const retell_call_id = payload.retell_call_id || payload.call_id || payload?.call?.call_id;
    if (retell_call_id && restaurant_id) {
      await fetch(
        `${SUPABASE_URL}/rest/v1/call_logs?on_conflict=retell_call_id`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SERVICE_ROLE,
            Authorization: `Bearer ${SERVICE_ROLE}`,
            Prefer: "resolution=merge-duplicates,return=minimal",
          },
          body: JSON.stringify({
            restaurant_id,
            retell_call_id,
            from_number: fromNumber ?? null,
            to_number: toNumber ?? null,
            started_at: payload.started_at || payload?.call?.start_timestamp || new Date().toISOString(),
            ended_at: payload.ended_at || payload?.call?.end_timestamp || null,
            duration_seconds: payload.duration_seconds ?? payload?.call?.duration_seconds ?? null,
            status: payload.event ?? payload?.call?.call_status ?? payload.status ?? null,
            recording_url: payload.recording_url ?? payload?.call?.recording_url ?? null,
            transcript: payload.transcript ?? payload?.call?.transcript ?? null,
            raw_payload: payload,
            created_at: new Date().toISOString(),
          }),
        }
      );
    }

    // Retell webhooks time out fast; reply quickly with 2xx. :contentReference[oaicite:2]{index=2}
    return res.status(200).json({ ok: true });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "Webhook error" });
  }
}
