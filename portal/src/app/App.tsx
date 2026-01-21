import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '@/utils/supabase/info';
import { AuthScreen } from '@/app/components/auth-screen';
import { Header } from '@/app/components/header';
import { Dashboard } from '@/app/components/dashboard';
import { CallLogs } from '@/app/components/call-logs';
import { CallDetail } from '@/app/components/call-detail';
import { toast, Toaster } from 'sonner';

// Create Supabase client
const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

const logDevError = (message: string, error: unknown) => {
  if (import.meta.env.DEV) {
    console.error(message, error);
  }
};

interface Restaurant {
  id: string;
  name: string;
  role?: string;
}

interface Analytics {
  totalCalls: number;
  aiHandled: number;
  transferred: number;
  missed: number;
  afterHours: number;
  avgDuration: number;
  aiPercentage: number;
  callRecordingEnabled: boolean;
  callTranscriptsEnabled: boolean;
}

interface Call {
  id: string;
  created_at: string;
  caller: string;
  status: string;
  topic: string;
  duration: number;
  is_after_hours: boolean;
}

export default function App() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [currentRestaurantId, setCurrentRestaurantId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'calls' | 'call-detail'>('dashboard');
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [calls, setCalls] = useState<Call[]>([]);
  const [selectedCall, setSelectedCall] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Check for existing session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.log('Session error:', error);
        setLoading(false);
        return;
      }

      if (session?.access_token) {
        setAccessToken(session.access_token);
        await loadRestaurants();
      }
    } catch (error) {
      console.log('Error checking session:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    setAuthError(null);
    setLoading(true);

    try {
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setAuthError(error.message);
        toast.error(error.message);
        return;
      }

      if (session?.access_token) {
        setAccessToken(session.access_token);
        await loadRestaurants();
        toast.success('Signed in successfully');
      }
    } catch (error: any) {
      const errorMsg = error.message || 'Failed to sign in';
      setAuthError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (email: string, password: string, name: string) => {
    setAuthError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        throw error;
      }

      toast.success('Account created! Please sign in.');
      setAuthError(null);
    } catch (error: any) {
      const errorMsg = error.message || 'Failed to sign up';
      setAuthError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAccessToken(null);
    setRestaurants([]);
    setCurrentRestaurantId(null);
    setAnalytics(null);
    setCalls([]);
    toast.success('Logged out successfully');
  };

  const loadRestaurants = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        logDevError('Failed to load session for restaurants', sessionError);
        throw new Error('Unable to load restaurants.');
      }

      type AccountWithRestaurants = {
        restaurants: { id: string; name: string }[] | null;
      };

      const { data: accountRows, error: accountError } = await supabase
        .from('accounts')
        .select('restaurants ( id, name )')
        .eq('owner_user_id', session.user.id);

      if (accountError) {
        logDevError('Failed to load account restaurants', accountError);
      }

      let restaurantsData =
        (accountRows as AccountWithRestaurants[] | null)
          ?.flatMap((row) => row.restaurants ?? []) ?? [];

      if (accountError || restaurantsData.length === 0) {
        const { data: restaurantRows, error: restaurantError } = await supabase
          .from('restaurants')
          .select('id, name');

        if (restaurantError) {
          logDevError('Failed to load restaurants directly', restaurantError);
          throw new Error('Unable to load restaurants.');
        }

        restaurantsData = restaurantRows ?? [];
      }

      setRestaurants(restaurantsData);

      if (restaurantsData.length > 0) {
        setCurrentRestaurantId(restaurantsData[0].id);
      } else {
        setCurrentRestaurantId(null);
        toast.error('No restaurants available. Please contact DineTalk support.');
      }
    } catch (error: any) {
      logDevError('Error loading restaurants', error);
      toast.error(error.message || 'Failed to load restaurants');
    }
  };

  // Load analytics when restaurant changes
  useEffect(() => {
    if (accessToken && currentRestaurantId && currentView === 'dashboard') {
      loadAnalytics();
    }
  }, [accessToken, currentRestaurantId, currentView]);

  // Load calls when restaurant changes or view is calls
  useEffect(() => {
    if (accessToken && currentRestaurantId && currentView === 'calls') {
      loadCalls();
    }
  }, [accessToken, currentRestaurantId, currentView, currentPage]);

  const loadAnalytics = async () => {
    if (!accessToken || !currentRestaurantId) return;

    try {
      const { data: callLogs, error: callError } = await supabase
        .from('call_logs')
        .select('status, duration_seconds')
        .eq('restaurant_id', currentRestaurantId);

      if (callError) {
        throw callError;
      }

      const totalCalls = callLogs?.length ?? 0;
      const aiHandled = callLogs?.filter(call => call.status === 'ai_handled').length ?? 0;
      const transferred = callLogs?.filter(call => call.status === 'transferred').length ?? 0;
      const missed = callLogs?.filter(call => call.status === 'missed').length ?? 0;
      const avgDuration = totalCalls > 0
        ? (callLogs ?? []).reduce((sum, call) => sum + (call.duration_seconds ?? 0), 0) / totalCalls
        : 0;
      const aiPercentage = totalCalls > 0 ? (aiHandled / totalCalls) * 100 : 0;

      setAnalytics({
        totalCalls,
        aiHandled,
        transferred,
        missed,
        afterHours: 0,
        avgDuration,
        aiPercentage,
        callRecordingEnabled: true,
        callTranscriptsEnabled: true,
      });
    } catch (error: any) {
      console.log('Error loading analytics:', error);
      toast.error(error.message || 'Failed to load analytics');
    }
  };

  const loadCalls = async () => {
    if (!accessToken || !currentRestaurantId) return;

    try {
      const limit = 50;
      const offset = (currentPage - 1) * limit;

      const { data: callLogs, error: callsError, count } = await supabase
        .from('call_logs')
        .select(
          'id, created_at, status, from_number, duration_seconds, started_at, ended_at',
          { count: 'exact' }
        )
        .eq('restaurant_id', currentRestaurantId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (callsError) {
        throw callsError;
      }

      const normalizedCalls = (callLogs ?? []).map(call => ({
        id: call.id,
        created_at: call.created_at ?? new Date().toISOString(),
        caller: call.from_number || 'Unknown caller',
        status: call.status || 'unknown',
        topic: 'General enquiry',
        duration: call.duration_seconds ?? 0,
        is_after_hours: false,
      }));

      setCalls(normalizedCalls);
      setTotalPages(Math.ceil((count ?? 0) / limit));
    } catch (error: any) {
      console.log('Error loading calls:', error);
      toast.error(error.message || 'Failed to load calls');
    }
  };

  const loadCallDetail = async (callId: string) => {
    if (!accessToken || !currentRestaurantId) return;

    try {
      const { data: callLog, error: callError } = await supabase
        .from('call_logs')
        .select(
          'id, created_at, status, from_number, duration_seconds, transcript, recording_url'
        )
        .eq('id', callId)
        .single();

      if (callError || !callLog) {
        throw callError || new Error('Call not found');
      }

      const call = {
        id: callLog.id,
        created_at: callLog.created_at ?? new Date().toISOString(),
        caller: callLog.from_number || 'Unknown caller',
        status: callLog.status ?? 'unknown',
        topic: 'General enquiry',
        duration: callLog.duration_seconds ?? 0,
        is_after_hours: false,
      };

      const transcript = callLog.transcript
        ? { id: callLog.id, transcript_text: callLog.transcript }
        : null;

      setSelectedCall({
        call,
        transcript,
        summary: null,
        transcriptsEnabled: Boolean(callLog.transcript),
        recordingUrl: callLog.recording_url ?? null,
      });
      setCurrentView('call-detail');
    } catch (error: any) {
      console.log('Error loading call detail:', error);
      toast.error(error.message || 'Failed to load call details');
    }
  };

  const handleRestaurantChange = (restaurantId: string) => {
    setCurrentRestaurantId(restaurantId);
    setCurrentView('dashboard');
    setCurrentPage(1);
  };

  const handleViewChange = (view: 'dashboard' | 'calls') => {
    setCurrentView(view);
    setCurrentPage(1);
  };

  // Show loading screen
  if (loading && !accessToken) {
    return (
      <div className="size-full flex items-center justify-center">
        <div className="text-center">
          <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show auth screen if not logged in
  if (!accessToken) {
    return (
      <>
        <AuthScreen
          onLogin={handleLogin}
          onSignup={handleSignup}
          loading={loading}
          error={authError}
        />
        <Toaster position="top-right" />
      </>
    );
  }

  const currentRestaurant = restaurants.find(r => r.id === currentRestaurantId);

  return (
    <div className="min-h-screen bg-background">
      <Header
        restaurants={restaurants}
        currentRestaurantId={currentRestaurantId || ''}
        onRestaurantChange={handleRestaurantChange}
        onLogout={handleLogout}
        currentView={currentView === 'call-detail' ? 'calls' : currentView}
        onViewChange={handleViewChange}
      />

      <main className="container mx-auto px-4 py-8">
        {!currentRestaurantId ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No restaurants available. Please contact DineTalk support.
            </p>
          </div>
        ) : currentView === 'dashboard' ? (
          analytics && currentRestaurant ? (
            <Dashboard
              analytics={analytics}
              restaurantName={currentRestaurant.name}
            />
          ) : (
            <div className="text-center py-12">
              <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading analytics...</p>
            </div>
          )
        ) : currentView === 'calls' ? (
          <CallLogs
            calls={calls}
            onCallClick={loadCallDetail}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        ) : selectedCall ? (
          <CallDetail
            call={selectedCall.call}
            transcript={selectedCall.transcript}
            summary={selectedCall.summary}
            transcriptsEnabled={selectedCall.transcriptsEnabled}
            recordingUrl={selectedCall.recordingUrl}
            onBack={() => setCurrentView('calls')}
          />
        ) : null}
      </main>

      <Toaster position="top-right" />
    </div>
  );
}
