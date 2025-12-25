import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallbackPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(window.location.href);
      if (exchangeError) {
        if (!cancelled) setError(exchangeError.message);
        return;
      }

      const session = await waitForStableSession();
      if (!cancelled && session) {
        navigate('/restaurants', { replace: true });
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  if (error) {
    return (
      <div style={{ maxWidth: 460, margin: '80px auto', padding: 24 }} className="card">
        <h2>Authentication error</h2>
        <p className="mb-3">{error}</p>
        <Link to="/login" className="button">
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 460, margin: '80px auto', padding: 24 }} className="card">
      <p>Completing sign in…</p>
    </div>
  );
}

async function waitForStableSession(attempts = 3, delayMs = 350) {
  let tries = 0;
  while (tries < attempts) {
    const { data } = await supabase.auth.getSession();
    if (data.session) return data.session;

    tries += 1;
    if (tries < attempts) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return null;
}
