import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuthContext } from '@/context/AuthContext';
import type { CallLog } from '@/types';

interface UseCallLogsResult {
  calls: CallLog[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useCallLogs(): UseCallLogsResult {
  const { session, loading: authLoading } = useAuthContext();
  const [calls, setCalls] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shouldLoad = useMemo(() => !!session && !authLoading, [session, authLoading]);

  const fetchCalls = useCallback(async () => {
    if (!shouldLoad) return;
    setLoading(true);
    setError(null);

    const { data, error: callError } = await supabase
      .from('call_logs')
      .select(
        'id, restaurant_id, retell_call_id, from_number, to_number, started_at, ended_at, duration_seconds, status, recording_url, transcript, raw_payload, created_at',
      )
      .order('started_at', { ascending: false });

    if (callError) {
      if (import.meta.env.DEV) {
        console.error('Failed to load call logs', callError);
      }
      setError('Call data unavailable');
      setCalls([]);
    } else {
      setCalls((data as CallLog[] | null) ?? []);
    }

    setLoading(false);
  }, [shouldLoad]);

  useEffect(() => {
    void fetchCalls();
  }, [fetchCalls]);

  return {
    calls,
    loading: loading || (authLoading && calls.length === 0),
    error,
    refresh: fetchCalls,
  };
}
