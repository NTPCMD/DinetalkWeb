import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import {
  LayoutDashboard,
  Phone,
  ChartBar,
  LogOut,
  Circle,
} from 'lucide-react';
import { Button } from '@/ui/button';
import { useAuthContext } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import type { Restaurant } from '@/types';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Calls', href: '/calls', icon: Phone },
  { name: 'Analytics', href: '/analytics', icon: ChartBar },
];

export interface PortalOutletContext {
  restaurant: Restaurant | null;
  reloadRestaurant: () => Promise<void>;
  restaurantLoading: boolean;
}

export function AppLayout() {
  const { session, signOut } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loadingRestaurant, setLoadingRestaurant] = useState(true);

  const loadRestaurant = async () => {
    if (!session) return;
    setLoadingRestaurant(true);
    const { data, error } = await supabase.from('restaurants').select('*').maybeSingle();
    if (error) {
      console.error('Failed to load restaurant', error);
      setLoadingRestaurant(false);
      return;
    }
    setRestaurant((data as Restaurant | null) ?? null);
    setLoadingRestaurant(false);
  };

  useEffect(() => {
    void loadRestaurant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id]);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const activePath = useMemo(() => location.pathname, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-muted/40">
      <div className="flex w-64 flex-col border-r bg-background">
        <div className="border-b px-6 py-5">
          <h1 className="text-xl font-semibold text-foreground">DineTalk Portal</h1>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = activePath === item.href;
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'bg-primary/5 text-primary' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="border-t p-4">
          <div className="mb-3 rounded-md bg-muted/60 px-3 py-2">
            <p className="text-xs text-muted-foreground">Signed in as</p>
            <p className="truncate text-sm font-medium text-foreground">{session?.user?.email ?? 'Loading...'}</p>
          </div>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={handleLogout}>
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="border-b bg-background px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Restaurant</p>
              <h2 className="text-2xl font-semibold text-foreground">
                {loadingRestaurant ? 'Loading...' : restaurant?.name ?? 'Your restaurant'}
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-muted/70 px-3 py-1 text-xs font-medium text-green-700">
              <Circle className="h-3 w-3 fill-green-500 text-green-500" />
              AI Active
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-muted/40">
          <div className="p-6">
            <Outlet context={{ restaurant, reloadRestaurant: loadRestaurant, restaurantLoading: loadingRestaurant }} />
          </div>
        </div>
      </div>
    </div>
  );
}
