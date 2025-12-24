import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import type { Restaurant, RestaurantHour } from '@/types';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function HoursPage() {
  const { id } = useParams();
  const { restaurant } = useOutletContext<{ restaurant?: Restaurant }>();
  const [hours, setHours] = useState<RestaurantHour[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    supabase
      .from('restaurant_hours')
      .select('*')
      .eq('restaurant_id', id)
      .order('day_of_week')
      .then(({ data }) => {
        if (data) setHours(data);
      });
  }, [id]);

  const updateHour = (day: number, patch: Partial<RestaurantHour>) => {
    setHours((prev) => {
      const existing = prev.find((h) => h.day_of_week === day);
      if (existing) {
        return prev.map((h) => (h.day_of_week === day ? { ...h, ...patch } : h));
      }
      return [...prev, { restaurant_id: id!, day_of_week: day, open_time: null, close_time: null, closed: false, ...patch }];
    });
  };

  const save = async () => {
    if (!id) return;
    setSaving(true);
    const upserts = hours.map((h) => ({ ...h, restaurant_id: id }));
    await supabase.from('restaurant_hours').upsert(upserts, { onConflict: 'restaurant_id,day_of_week' });
    setSaving(false);
  };

  if (!restaurant) return <div className="card">Select a restaurant</div>;

  return (
    <div>
      <div className="header">
        <h2>Hours</h2>
        <button className="button" onClick={save} disabled={saving}>
          {saving ? 'Saving…' : 'Save all'}
        </button>
      </div>
      <div className="card">
        {DAYS.map((label, index) => {
          const row = hours.find((h) => h.day_of_week === index);
          return (
            <div key={label} className="form-row" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: 12 }}>
              <div className="flex justify-between align-center">
                <strong>{label}</strong>
                <label className="flex align-center gap">
                  <input
                    type="checkbox"
                    checked={row?.closed ?? false}
                    onChange={(e) => updateHour(index, { closed: e.target.checked })}
                  />
                  Closed
                </label>
              </div>
              {!row?.closed && (
                <div className="flex gap">
                  <input
                    className="input"
                    type="time"
                    value={row?.open_time ?? ''}
                    onChange={(e) => updateHour(index, { open_time: e.target.value })}
                  />
                  <span style={{ alignSelf: 'center' }}>to</span>
                  <input
                    className="input"
                    type="time"
                    value={row?.close_time ?? ''}
                    onChange={(e) => updateHour(index, { close_time: e.target.value })}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
