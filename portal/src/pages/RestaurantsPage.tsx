import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/hooks/useAuth';
import { useRestaurants } from '@/hooks/useRestaurants';

export default function RestaurantsPage() {
  const { account } = useAuth();
  const { restaurants, setRestaurants, loading } = useRestaurants(account?.id);
  const [name, setName] = useState('');
  const [timezone, setTimezone] = useState('Australia/Sydney');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!account) return;
    setSaving(true);
    setError(null);
    const { data, error: insertError } = await supabase
      .from('restaurants')
      .insert({
        account_id: account.id,
        name,
        timezone,
        calls_portal_enabled: false,
        recordings_enabled: false,
        transcripts_enabled: false,
      })
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
    } else if (data) {
      setRestaurants([data, ...restaurants]);
      setName('');
    }
    setSaving(false);
  };

  return (
    <div className="content">
      <div className="header">
        <h2>Your restaurants</h2>
      </div>
      <div className="card">
        <h3>Create restaurant</h3>
        <form onSubmit={handleCreate}>
          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="tz">Timezone</label>
            <input
              id="tz"
              className="input"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              placeholder="Australia/Sydney"
              required
            />
          </div>
          <button className="button" disabled={saving}>
            {saving ? 'Creating…' : 'Create'}
          </button>
        </form>
        {error && <p className="text-muted">{error}</p>}
      </div>
      <div className="card">
        <h3>Restaurants</h3>
        {loading && <p>Loading…</p>}
        {!loading && restaurants.length === 0 && <p>No restaurants yet.</p>}
        {!loading && restaurants.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Timezone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((r) => (
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td>{r.timezone}</td>
                  <td>
                    <Link to={`/r/${r.id}/dashboard`}>Open</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
