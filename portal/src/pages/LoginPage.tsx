import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { session } = useAuth();

  if (session) {
    navigate('/restaurants');
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/portal/`,
      },
    });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Check your email for a magic link to sign in.');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 420, margin: '80px auto', padding: 24 }} className="card">
      <h2>Login</h2>
      <p className="text-muted">We use passwordless magic links.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
        <button className="button" type="submit" disabled={loading}>
          {loading ? 'Sending…' : 'Send magic link'}
        </button>
      </form>
      {message && <p className="mb-3">{message}</p>}
    </div>
  );
}
