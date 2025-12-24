import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { Restaurant } from '@/types';

export function useRestaurants(accountId: string | undefined) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accountId) return;
    setLoading(true);
    supabase
      .from('restaurants')
      .select('*')
      .eq('account_id', accountId)
      .order('created_at', { ascending: false })
      .then(({ data, error: fetchError }) => {
        if (fetchError) {
          setError(fetchError.message);
        } else {
          setRestaurants(data ?? []);
        }
        setLoading(false);
      });
  }, [accountId]);

  return { restaurants, setRestaurants, loading, error };
}
