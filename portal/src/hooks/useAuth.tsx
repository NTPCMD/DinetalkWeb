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
    supabase.auth.getSession().then(({ data }) => {
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
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session) {
      setAccount(null);
      return;
    }
    refreshAccount();
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
