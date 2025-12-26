import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { Restaurant } from '@/types';
import type { Account } from '@/types';

interface Options {
  account: Account | null;
}

export function useRestaurants({ account }: Options) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurants = async () => {
    if (!account) return;
    setLoading(true);
    setError(null);
    const { data, error: queryError } = await supabase
      .from('restaurants')
      .select('id, name, account_id, calls_portal_enabled, created_at')
      .eq('account_id', account.id)
      .order('name');

    if (queryError) {
      setError(queryError.message);
      setRestaurants([]);
    } else {
      setRestaurants((data as Restaurant[]) ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    void fetchRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.id]);

  return useMemo(
    () => ({ restaurants, loading, error, refresh: fetchRestaurants }),
    [restaurants, loading, error]
  );
}
