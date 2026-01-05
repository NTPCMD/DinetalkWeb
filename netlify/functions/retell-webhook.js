exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return { statusCode: 500, body: 'Supabase environment variables missing' };
  }

  let payload = {};
  try {
    payload = event.body ? JSON.parse(event.body) : {};
  } catch (e) {
    // Even if JSON is bad, log it to webhook_events as raw text
    await fetch(`${supabaseUrl}/rest/v1/webhook_events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
      body: JSON.stringify({
        source: 'retell',
        error: 'Invalid JSON',
        payload: { rawBody: event.body || null },
      }),
    });

    return { statusCode: 400, body: 'Invalid JSON' };
  }

  // Helper: normalize phone numbers (remove spaces, keep +)
  const norm = (s) => (typeof s === 'string' ? s.replace(/\s+/g, '') : s);

  // Try lots of shapes (Retell sometimes nests data)
  const rawTo =
    payload.to_number ||
    payload.to ||
    payload.called_number ||
    payload?.call?.to_number ||
    payload?.call?.to ||
    payload?.call?.called_number ||
    payload?.data?.to_number ||
    payload?.data?.to ||
    payload?.data?.called_number ||
    null;

  const rawFrom =
    payload.from_number ||
    payload.from ||
    payload?.call?.from_number ||
    payload?.call?.from ||
    payload?.data?.from_number ||
    payload?.data?.from ||
    null;

  const toNumber = norm(rawTo);
  const fromNumber = norm(rawFrom);

  // 1) ALWAYS write the raw event into webhook_events (so you can debug in Supabase)
  let restaurantId = null;
  let restaurantLookupOk = false;

  // Try to find restaurant by toNumber (if present)
  if (toNumber) {
    try {
      const restaurantRes = await fetch(
        `${supabaseUrl}/rest/v1/restaurants?retell_phone_number=eq.${encodeURIComponent(
          toNumber
        )}&select=id`,
        {
          headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
        }
      );

      const restaurants = await restaurantRes.json();
      restaurantId = restaurants?.[0]?.id || null;
      restaurantLookupOk = restaurantRes.ok;
    } catch (e) {
      restaurantLookupOk = false;
    }
  }

  const eventInsertRes = await fetch(`${supabaseUrl}/rest/v1/webhook_events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
    body: JSON.stringify({
      source: 'retell',
      to_number: toNumber,
      from_number: fromNumber,
      restaurant_id: restaurantId,
      status: payload.status || payload?.call?.status || null,
      error: restaurantLookupOk ? null : 'Restaurant lookup may have failed (or no to_number).',
      payload,
    }),
  });

  // If even webhook_events insert failed, return details
  if (!eventInsertRes.ok) {
    const t = await eventInsertRes.text();
    return { statusCode: 500, body: `Failed to insert webhook_events: ${eventInsertRes.status} ${t}` };
  }

  // 2) If we can't map a restaurant, STOP and return 404
  if (!toNumber) {
    return { statusCode: 400, body: 'Missing to_number (check webhook_events payload in Supabase)' };
  }

  if (!restaurantId) {
    return { statusCode: 404, body: `No restaurant found for retell_phone_number=${toNumber}` };
  }

  // 3) Insert into call_logs (real table)
  const callLog = {
    restaurant_id: restaurantId,
    retell_call_id: payload.retell_call_id || payload.id || payload.call_id || payload?.call?.id || null,
    from_number: fromNumber,
    to_number: toNumber,
    started_at: payload.started_at || payload.start_time || payload?.call?.started_at || payload?.call?.start_time || new Date().toISOString(),
    ended_at: payload.ended_at || payload.end_time || payload?.call?.ended_at || payload?.call?.end_time || null,
    duration_seconds: payload.duration_seconds || payload.duration || payload?.call?.duration_seconds || payload?.call?.duration || null,
    status: payload.status || payload?.call?.status || 'received',
    recording_url: payload.recording_url || payload?.call?.recording_url || null,
    transcript: payload.transcript || payload?.call?.transcript || null,
    raw_payload: payload,
  };

  const insertRes = await fetch(`${supabaseUrl}/rest/v1/call_logs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      Prefer: 'resolution=merge-duplicates',
    },
    body: JSON.stringify(callLog),
  });

  if (!insertRes.ok) {
    const txt = await insertRes.text();

    // Update the last webhook_events row with the error (optional best-effort)
    await fetch(`${supabaseUrl}/rest/v1/webhook_events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
      body: JSON.stringify({
        source: 'retell',
        to_number: toNumber,
        from_number: fromNumber,
        restaurant_id: restaurantId,
        error: `call_logs insert failed: ${insertRes.status} ${txt}`,
        payload,
      }),
    });

    return { statusCode: 500, body: `Failed to insert call_logs: ${insertRes.status} ${txt}` };
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true, restaurant_id: restaurantId, to_number: toNumber }) };
};
