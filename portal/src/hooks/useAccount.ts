import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { delay } from '@/lib/utils';
import { useAuthContext } from '@/context/AuthContext';
import type { Account } from '@/types';

const MAX_ATTEMPTS = 5;

export function useAccount() {
  const { session } = useAuthContext();
  const [account, setAccount] = useState<Account | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'provisioning' | 'ready' | 'error'>('idle');

  useEffect(() => {
    let active = true;
    if (!session) {
      setAccount(null);
      setStatus('idle');
      return;
    }

    let attempts = 0;
    const fetchAccount = async () => {
      if (!active) return;
      attempts += 1;
      setStatus(attempts === 1 ? 'loading' : 'provisioning');
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('owner_user_id', session.user.id)
        .maybeSingle();

      if (!active) return;

      if (error) {
        setStatus('error');
        return;
      }

      if (data) {
        setAccount(data as Account);
        setStatus('ready');
        return;
      }

      if (attempts < MAX_ATTEMPTS) {
        await delay(1000);
        void fetchAccount();
      } else {
        setStatus('error');
      }
    };

    void fetchAccount();

    return () => {
      active = false;
    };
  }, [session]);

  return useMemo(() => ({ account, status }), [account, status]);
}
