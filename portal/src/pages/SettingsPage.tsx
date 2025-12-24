import { FormEvent, useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import type { Restaurant } from '@/types';

export default function SettingsPage() {
  const { id } = useParams();
  const context = useOutletContext<{ restaurant?: Restaurant }>();
  const [form, setForm] = useState<Restaurant | null>(context.restaurant ?? null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!id) return;
    supabase
      .from('restaurants')
      .select('*')
      .eq('id', id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setForm(data);
      });
  }, [id]);

  const handleChange = (key: keyof Restaurant, value: any) => {
    if (!form) return;
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage('');
    const { error } = await supabase
      .from('restaurants')
      .update({
        name: form.name,
        timezone: form.timezone,
        address: form.address,
        public_phone: form.public_phone,
        transfer_phone: form.transfer_phone,
        retell_agent_id: form.retell_agent_id,
        retell_phone_number: form.retell_phone_number,
        calls_portal_enabled: form.calls_portal_enabled,
        recordings_enabled: form.recordings_enabled,
        transcripts_enabled: form.transcripts_enabled,
      })
      .eq('id', form.id);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Saved');
    }
    setSaving(false);
  };

  if (!form) return <div className="card">Loading restaurant…</div>;

  return (
    <div>
      <div className="header">
        <h2>Settings</h2>
      </div>
      <form className="card" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            className="input"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="tz">Timezone</label>
          <input
            id="tz"
            className="input"
            value={form.timezone}
            onChange={(e) => handleChange('timezone', e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            className="input"
            value={form.address ?? ''}
            onChange={(e) => handleChange('address', e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="public_phone">Public phone</label>
          <input
            id="public_phone"
            className="input"
            value={form.public_phone ?? ''}
            onChange={(e) => handleChange('public_phone', e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="transfer_phone">Transfer phone</label>
          <input
            id="transfer_phone"
            className="input"
            value={form.transfer_phone ?? ''}
            onChange={(e) => handleChange('transfer_phone', e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="retell_agent_id">Retell agent ID</label>
          <input
            id="retell_agent_id"
            className="input"
            value={form.retell_agent_id ?? ''}
            onChange={(e) => handleChange('retell_agent_id', e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="retell_phone_number">Retell phone number</label>
          <input
            id="retell_phone_number"
            className="input"
            value={form.retell_phone_number ?? ''}
            onChange={(e) => handleChange('retell_phone_number', e.target.value)}
          />
        </div>
        <div className="form-row">
          <label className="flex align-center gap">
            <input
              type="checkbox"
              checked={form.calls_portal_enabled}
              onChange={(e) => handleChange('calls_portal_enabled', e.target.checked)}
            />
            Enable call history
          </label>
          <label className="flex align-center gap">
            <input
              type="checkbox"
              checked={form.recordings_enabled}
              onChange={(e) => handleChange('recordings_enabled', e.target.checked)}
            />
            Allow recordings playback
          </label>
          <label className="flex align-center gap">
            <input
              type="checkbox"
              checked={form.transcripts_enabled}
              onChange={(e) => handleChange('transcripts_enabled', e.target.checked)}
            />
            Show transcripts
          </label>
        </div>
        <button className="button" disabled={saving}>
          {saving ? 'Saving…' : 'Save settings'}
        </button>
        {message && <p className="text-muted">{message}</p>}
      </form>
    </div>
  );
}
