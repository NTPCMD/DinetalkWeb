import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth
      .exchangeCodeForSession(window.location.href)
      .then(({ error: exchangeError }) => {
        if (exchangeError) {
          setError(exchangeError.message);
        } else {
          setReady(true);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (password !== confirm) {
      setMessage('Passwords do not match.');
      return;
    }
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setMessage(updateError.message);
    } else {
      setMessage('Password updated. You can continue.');
      navigate('/restaurants');
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: 460, margin: '80px auto', padding: 24 }} className="card">
        <p>Loading reset link…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: 460, margin: '80px auto', padding: 24 }} className="card">
        <p className="mb-3">{error}</p>
        <Link to="/login" className="button">
          Back to login
        </Link>
      </div>
    );
  }

  if (!ready) {
    return null;
  }

  return (
    <div style={{ maxWidth: 460, margin: '80px auto', padding: 24 }} className="card">
      <h2>Choose a new password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="password">New password</label>
          <input
            id="password"
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="confirm">Confirm new password</label>
          <input
            id="confirm"
            className="input"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        <button className="button" type="submit">
          Update password
        </button>
      </form>
      {message && <p className="mb-3">{message}</p>}
    </div>
  );
}
