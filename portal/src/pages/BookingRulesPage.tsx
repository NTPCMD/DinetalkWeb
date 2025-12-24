import { FormEvent, useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import type { BookingRules, Restaurant } from '@/types';

const DEFAULT_RULES: BookingRules = {
  restaurant_id: '',
  default_duration_minutes: 60,
  max_party_size: 8,
  min_notice_minutes: 30,
  buffer_minutes: 10,
  max_days_ahead: 30,
  updated_at: '',
};

export default function BookingRulesPage() {
  const { id } = useParams();
  const { restaurant } = useOutletContext<{ restaurant?: Restaurant }>();
  const [rules, setRules] = useState<BookingRules | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    supabase
      .from('booking_rules')
      .select('*')
      .eq('restaurant_id', id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setRules(data);
        else setRules({ ...DEFAULT_RULES, restaurant_id: id });
      });
  }, [id]);

  const handleChange = (key: keyof BookingRules, value: number) => {
    if (!rules) return;
    setRules({ ...rules, [key]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!rules) return;
    setSaving(true);
    await supabase.from('booking_rules').upsert(rules, { onConflict: 'restaurant_id' });
    setSaving(false);
  };

  if (!restaurant) return <div className="card">Select a restaurant</div>;
  if (!rules) return <div className="card">Loading…</div>;

  return (
    <div>
      <div className="header">
        <h2>Booking rules</h2>
      </div>
      <form className="card" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Default duration (minutes)</label>
          <input
            className="input"
            type="number"
            value={rules.default_duration_minutes}
            onChange={(e) => handleChange('default_duration_minutes', Number(e.target.value))}
          />
        </div>
        <div className="form-row">
          <label>Max party size</label>
          <input
            className="input"
            type="number"
            value={rules.max_party_size}
            onChange={(e) => handleChange('max_party_size', Number(e.target.value))}
          />
        </div>
        <div className="form-row">
          <label>Min notice (minutes)</label>
          <input
            className="input"
            type="number"
            value={rules.min_notice_minutes}
            onChange={(e) => handleChange('min_notice_minutes', Number(e.target.value))}
          />
        </div>
        <div className="form-row">
          <label>Buffer minutes</label>
          <input
            className="input"
            type="number"
            value={rules.buffer_minutes}
            onChange={(e) => handleChange('buffer_minutes', Number(e.target.value))}
          />
        </div>
        <div className="form-row">
          <label>Max days ahead</label>
          <input
            className="input"
            type="number"
            value={rules.max_days_ahead}
            onChange={(e) => handleChange('max_days_ahead', Number(e.target.value))}
          />
        </div>
        <button className="button" disabled={saving}>
          {saving ? 'Saving…' : 'Save rules'}
        </button>
      </form>
    </div>
  );
}
