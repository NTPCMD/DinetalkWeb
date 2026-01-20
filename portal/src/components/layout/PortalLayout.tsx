import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { ChartBar, Circle, LayoutDashboard, LogOut, Phone } from 'lucide-react';
import { Button } from '@/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from '@/ui/sidebar';
import { useAuthContext } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { cn } from '@/ui/utils';
import type { Restaurant } from '@/types';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, end: true },
  { name: 'Call Logs', href: '/calls', icon: Phone },
  { name: 'Analytics', href: '/analytics', icon: ChartBar },
];

export interface PortalOutletContext {
  restaurant: Restaurant | null;
  reloadRestaurant: () => Promise<void>;
  restaurantLoading: boolean;
}

export function PortalLayout() {
  const { session, signOut } = useAuthContext();
  const navigate = useNavigate();
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

  const restaurantName = useMemo(() => {
    if (loadingRestaurant) return 'Loading...';
    return restaurant?.name ?? 'Your restaurant';
  }, [loadingRestaurant, restaurant?.name]);

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="gap-3 px-3 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-sidebar-foreground/60">DineTalk Client Portal</p>
              <h1 className="text-base font-semibold text-sidebar-foreground">Operations</h1>
            </div>
            <SidebarTrigger className="md:hidden" />
          </div>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarMenu className="px-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.href}
                      end={item.end}
                      className={({ isActive }) =>
                        cn('flex items-center gap-2', isActive && 'bg-sidebar-accent text-sidebar-accent-foreground')
                      }
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter className="gap-2 px-2 pb-3">
          <div className="rounded-md bg-sidebar-accent/40 px-3 py-2 text-xs text-sidebar-foreground/70">
            Signed in as
            <p className="truncate text-sm font-medium text-sidebar-foreground">{session?.user?.email ?? 'Loading...'}</p>
          </div>
          <Button variant="ghost" className="justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between border-b bg-background px-6 py-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="hidden md:inline-flex" />
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Restaurant</p>
              <h2 className="text-xl font-semibold text-foreground">{restaurantName}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-muted/70 px-3 py-1 text-xs font-medium text-green-700">
            <Circle className="h-3 w-3 fill-green-500 text-green-500" />
            AI Active
          </div>
        </header>
        <div className="flex-1 overflow-auto bg-muted/40">
          <div className="p-6">
            <Outlet context={{ restaurant, reloadRestaurant: loadRestaurant, restaurantLoading: loadingRestaurant }} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
