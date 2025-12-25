exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return { statusCode: 500, body: 'Supabase environment variables missing' };
  }

  const payload = event.body ? JSON.parse(event.body) : {};
  const toNumber = payload.to_number || payload.to || payload.called_number;

  try {
    const restaurantRes = await fetch(
      `${supabaseUrl}/rest/v1/restaurants?retell_phone_number=eq.${encodeURIComponent(
        toNumber || '',
      )}&select=id`,
      {
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
        },
      },
    );
    const restaurants = await restaurantRes.json();
    const restaurantId = restaurants?.[0]?.id;

    const callLog = {
      restaurant_id: restaurantId,
      retell_call_id: payload.retell_call_id || payload.id || payload.call_id,
      from_number: payload.from_number || payload.from,
      to_number: toNumber,
      started_at: payload.started_at || payload.start_time || new Date().toISOString(),
      ended_at: payload.ended_at || payload.end_time || null,
      duration_seconds: payload.duration_seconds || payload.duration || null,
      status: payload.status || 'received',
      recording_url: payload.recording_url || null,
      transcript: payload.transcript || null,
      raw_payload: payload,
    };

    await fetch(`${supabaseUrl}/rest/v1/call_logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Prefer: 'resolution=merge-duplicates',
      },
      body: JSON.stringify(callLog),
    });

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: String(error) }) };
  }
};
