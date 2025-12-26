import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/portal/reset-password`,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Check your email for a reset link.');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 460, margin: '80px auto', padding: 24 }} className="card">
      <h2>Reset password</h2>
      <p className="text-muted">We will send you a link to choose a new password.</p>
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
        <div className="flex align-center mb-3" style={{ gap: 8 }}>
          <Link to="/login" className="link-button">
            Back to login
          </Link>
        </div>
        <button className="button" type="submit" disabled={loading}>
          {loading ? 'Sending…' : 'Send reset link'}
        </button>
      </form>
      {message && <p className="mb-3">{message}</p>}
    </div>
  );
}
