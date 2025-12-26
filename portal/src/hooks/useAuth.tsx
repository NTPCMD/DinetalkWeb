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
  const [accountLoading, setAccountLoading] = useState(false);
  const [provisioning, setProvisioning] = useState(false);

  const loadAccountWithRetry = async (userId: string) => {
    let attempts = 0;
    let found: Account | null = null;
    const start = Date.now();

    // Keep loading state scoped to the fetch cycle so ProtectedRoute can render
    // a provisioning UI instead of an "account not found" error.
    setAccountLoading(true);
    setProvisioning(false);

    while (attempts < 3 && !found) {
      const stableSession = await waitForStableSession();
      if (!stableSession) {
        attempts += 1;
        await delay(350);
        continue;
      }

      const { data, error, status } = await supabase
        .from('accounts')
        .select('*')
        .eq('owner_user_id', userId)
        .maybeSingle();

      const stillSettling = status && (status === 401 || status === 406);
      const withinGrace = Date.now() - start < 1200;

      if (error) {
        if (stillSettling && withinGrace) {
          attempts += 1;
          await delay(400);
          continue;
        }
        console.error('Failed to load account', error);
      }

      found = data ?? null;

      if (!found) {
        attempts += 1;
        if (attempts < 3) {
          await delay(400);
        }
      }
    }

    setAccount(found);
    setAccountLoading(false);
    setProvisioning(!found);

    return Boolean(found);
  };

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
      setProvisioning(false);
      setAccountLoading(false);
      return;
    }

    let cancelled = false;
    const attemptLoad = async () => {
      const stableSession = await waitForStableSession();
      if (!stableSession) return;

      await ensureProvisioned(session.user);
      const found = await loadAccountWithRetry(session.user.id);
      if (cancelled) return;

      if (!found) {
        setProvisioning(true);
      }
    };

    attemptLoad();

    return () => {
      cancelled = true;
    };
  }, [session]);

  useEffect(() => {
    if (!session?.user || account || accountLoading) return;

    const retryId = window.setTimeout(() => {
      loadAccountWithRetry(session.user!.id);
    }, 1000);

    return () => window.clearTimeout(retryId);
  }, [session, account, accountLoading]);

  const refreshAccount = async () => {
    if (!session?.user) return;
    setProvisioning(false);
    await loadAccountWithRetry(session.user.id);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setAccount(null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        account,
        loading: loading || accountLoading || provisioning,
        refreshAccount,
        signOut,
      }}
    >
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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForStableSession(attempts = 3, delayMs = 350) {
  let tries = 0;
  while (tries < attempts) {
    const { data } = await supabase.auth.getSession();
    if (data.session) return data.session;

    tries += 1;
    if (tries < attempts) {
      await delay(delayMs);
    }
  }

  return null;
}
