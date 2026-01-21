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

// Server URL
const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-7234a240`;

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
  status: 'ai_handled' | 'transferred' | 'missed';
  topic: string;
  duration: number;
  is_after_hours: boolean;
  outcome?: string;
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
        await loadRestaurants(session.access_token);
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
        await loadRestaurants(session.access_token);
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
      const response = await fetch(`${SERVER_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign up');
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

  const loadRestaurants = async (token: string) => {
    try {
      const response = await fetch(`${SERVER_URL}/restaurants`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load restaurants');
      }

      const data = await response.json();
      setRestaurants(data.restaurants || []);
      
      if (data.restaurants && data.restaurants.length > 0) {
        setCurrentRestaurantId(data.restaurants[0].id);
      } else {
        toast.error('No restaurants available. Please contact DineTalk support.');
      }
    } catch (error: any) {
      console.log('Error loading restaurants:', error);
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
      const response = await fetch(`${SERVER_URL}/analytics/${currentRestaurantId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load analytics');
      }

      const data = await response.json();
      setAnalytics(data.analytics);
    } catch (error: any) {
      console.log('Error loading analytics:', error);
      toast.error(error.message || 'Failed to load analytics');
    }
  };

  const loadCalls = async () => {
    if (!accessToken || !currentRestaurantId) return;

    try {
      const response = await fetch(
        `${SERVER_URL}/calls/${currentRestaurantId}?page=${currentPage}&limit=50`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to load calls');
      }

      const data = await response.json();
      setCalls(data.calls || []);
      setTotalPages(Math.ceil((data.total || 0) / (data.limit || 50)));
    } catch (error: any) {
      console.log('Error loading calls:', error);
      toast.error(error.message || 'Failed to load calls');
    }
  };

  const loadCallDetail = async (callId: string) => {
    if (!accessToken || !currentRestaurantId) return;

    try {
      const response = await fetch(
        `${SERVER_URL}/calls/${currentRestaurantId}/${callId}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to load call details');
      }

      const data = await response.json();
      
      // Try to get recording URL if enabled
      let recordingUrl = null;
      const call = data.call;
      const restaurant = restaurants.find(r => r.id === currentRestaurantId);
      
      if (call && restaurant) {
        try {
          const recResponse = await fetch(
            `${SERVER_URL}/recording/${currentRestaurantId}/${callId}`,
            {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
              },
            }
          );
          
          if (recResponse.ok) {
            const recData = await recResponse.json();
            recordingUrl = recData.url;
          }
        } catch (error) {
          // Recording not available
          console.log('Recording not available');
        }
      }

      setSelectedCall({
        ...data,
        recordingUrl,
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
