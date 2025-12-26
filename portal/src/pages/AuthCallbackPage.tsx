import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { delay } from '@/lib/utils';
import { LoadingState } from '@/components/common/LoadingState';

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('Finalizing sign in...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const handleCallback = async () => {
      setMessage('Exchanging code for session...');
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(window.location.href);
      if (!active) return;
      if (exchangeError) {
        setError(exchangeError.message);
        return;
      }

      let session = null;
      for (let attempt = 0; attempt < 3; attempt += 1) {
        const { data } = await supabase.auth.getSession();
        session = data.session;
        if (session) break;
        await delay(300);
      }

      if (!session) {
        setError('Unable to confirm your session. Please try signing in again.');
        return;
      }

      setMessage('Checking your account...');
      for (let attempt = 0; attempt < 5; attempt += 1) {
        const { data, error: accountError } = await supabase
          .from('accounts')
          .select('id')
          .eq('owner_user_id', session.user.id)
          .maybeSingle();

        if (!active) return;

        if (accountError) {
          setError(accountError.message);
          return;
        }

        if (data) {
          break;
        }

        await delay(300);
      }

      setMessage('Redirecting you to restaurants...');
      navigate('/restaurants', { replace: true });
    };

    void handleCallback();

    return () => {
      active = false;
    };
  }, [navigate]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-lg border border-red-200 bg-white p-8 shadow-card">
          <h1 className="text-lg font-semibold text-red-700">We couldn't complete sign in</h1>
          <p className="mt-3 text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return <LoadingState message={message} className="min-h-screen" />;
}
