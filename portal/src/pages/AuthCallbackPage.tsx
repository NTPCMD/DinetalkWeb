import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallbackPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.exchangeCodeForSession(window.location.href).then(({ error: exchangeError }) => {
      if (exchangeError) {
        setError(exchangeError.message);
      } else {
        navigate('/restaurants', { replace: true });
      }
    });
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
