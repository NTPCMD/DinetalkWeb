import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import type { CallLog, Restaurant } from '@/types';

export default function CallsPage() {
  const { id } = useParams();
  const { restaurant } = useOutletContext<{ restaurant?: Restaurant }>();
  const [calls, setCalls] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    supabase
      .from('call_logs')
      .select('*')
      .eq('restaurant_id', id)
      .order('started_at', { ascending: false })
      .then(({ data }) => {
        setCalls(data ?? []);
        setLoading(false);
      });
  }, [id]);

  if (!restaurant) return <div className="card">Select a restaurant</div>;

  if (!restaurant.calls_portal_enabled) {
    return <div className="card">Call history is not enabled.</div>;
  }

  return (
    <div>
      <div className="header">
        <h2>Call history</h2>
      </div>
      <div className="card">
        {loading && <p>Loading…</p>}
        {!loading && calls.length === 0 && <p>No calls yet.</p>}
        {!loading && calls.length > 0 && (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th>Started</th>
                  <th>Status</th>
                  <th>Duration</th>
                  <th>Recording</th>
                  <th>Transcript</th>
                  <th>Notes/Tags</th>
                </tr>
              </thead>
              <tbody>
                {calls.map((call) => (
                  <tr key={call.retell_call_id}>
                    <td>{call.from_number ?? 'Unknown'}</td>
                    <td>{call.to_number ?? 'Unknown'}</td>
                    <td>{call.started_at ? new Date(call.started_at).toLocaleString() : '—'}</td>
                    <td>{call.status ?? '—'}</td>
                    <td>{call.duration_seconds ? `${call.duration_seconds}s` : '—'}</td>
                    <td>
                      {restaurant.recordings_enabled && call.recording_url ? (
                        <audio controls src={call.recording_url} />
                      ) : (
                        <span className="text-muted">Unavailable</span>
                      )}
                    </td>
                    <td style={{ maxWidth: 240 }}>
                      {restaurant.transcripts_enabled && call.transcript ? (
                        <div style={{ whiteSpace: 'pre-wrap' }}>{call.transcript}</div>
                      ) : (
                        <span className="text-muted">Hidden</span>
                      )}
                    </td>
                    <td>
                      <textarea className="input" placeholder="Optional notes or tags" rows={2} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
