import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import { delay } from '@/lib/utils';

interface AuthContextValue {
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function getStableSession() {
  let attempts = 0;
  let session: Session | null = null;
  let lastError: Error | null = null;

  while (attempts < 3 && !session) {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      lastError = error;
    }
    session = data.session ?? null;
    if (session) break;
    attempts += 1;
    if (attempts < 3) {
      await delay(350);
    }
  }

  return { session, error: lastError };
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshSession = async () => {
    setLoading(true);
    const { session: stableSession } = await getStableSession();
    setSession(stableSession ?? null);
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      const { session: stableSession } = await getStableSession();
      if (!isMounted) return;
      setSession(stableSession ?? null);
      setLoading(false);
    };

    void initialize();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      isMounted = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      throw error;
    }
    await refreshSession();
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const requestPasswordReset = async (email: string) => {
    const redirectTo = `${window.location.origin}/portal/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) {
      throw error;
    }
  };

  const value = useMemo(
    () => ({
      session,
      loading,
      signIn,
      signOut,
      requestPasswordReset,
      refreshSession,
    }),
    [session, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return ctx;
}
