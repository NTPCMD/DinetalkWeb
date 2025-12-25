import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import type { Account } from '@/types';

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  account: Account | null;
  loading: boolean;
  refreshAccount: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      if (!newSession) {
        setAccount(null);
      }
    });

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session?.user) {
      setAccount(null);
      return;
    }

    ensureProvisioned(session.user).then(() => refreshAccount());
  }, [session]);

  const refreshAccount = async () => {
    if (!session?.user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('owner_user_id', session.user.id)
      .maybeSingle();

    if (error) {
      console.error('Failed to load account', error);
    }
    setAccount(data ?? null);
    setLoading(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setAccount(null);
  };

  return (
    <AuthContext.Provider value={{ session, user, account, loading, refreshAccount, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

async function ensureProvisioned(user: User) {
  const fullName =
    (typeof user.user_metadata?.full_name === 'string' && user.user_metadata.full_name) || user.email;

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .maybeSingle();

  if (!profile && !profileError) {
    const { error } = await supabase.from('profiles').insert({
      id: user.id,
      email: user.email,
      full_name: fullName,
    });
    if (error) {
      console.error('Failed to create profile', error);
    }
  }

  const { data: existingAccount, error: accountError } = await supabase
    .from('accounts')
    .select('id')
    .eq('owner_user_id', user.id)
    .maybeSingle();

  if (!existingAccount && !accountError) {
    const { error } = await supabase.from('accounts').insert({
      owner_user_id: user.id,
      name: fullName || 'My Account',
    });
    if (error) {
      console.error('Failed to create account', error);
    }
  }
}
