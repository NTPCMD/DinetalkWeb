import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/portal/auth/callback`,
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      if (data.session) {
        navigate('/restaurants');
      } else {
        setMessage('Check your email to confirm your account.');
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 460, margin: '80px auto', padding: 24 }} className="card">
      <h2>Create account</h2>
      <p className="text-muted">Start managing your restaurants in the portal.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            className="input"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Alex Smith"
            required
          />
        </div>
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
        <div className="form-row">
          <label htmlFor="password">Password</label>
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
        <div className="flex align-center mb-3" style={{ gap: 8 }}>
          <span>Already have an account?</span>
          <Link to="/login" className="link-button">
            Sign in
          </Link>
        </div>
        <button className="button" type="submit" disabled={loading}>
          {loading ? 'Creating…' : 'Create account'}
        </button>
      </form>
      {message && <p className="mb-3">{message}</p>}
    </div>
  );
}
