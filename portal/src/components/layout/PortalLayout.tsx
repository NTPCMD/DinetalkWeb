import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { useAccount } from '@/hooks/useAccount';
import { useRestaurants } from '@/hooks/useRestaurants';
import { LoadingState } from '@/components/common/LoadingState';
import { EmptyState } from '@/components/common/EmptyState';

export function PortalLayout() {
  const location = useLocation();
  const { account, status } = useAccount();
  const { restaurants, refresh } = useRestaurants({ account });

  const activeRestaurantId = location.pathname.startsWith('/r/')
    ? location.pathname.split('/')[2]
    : restaurants[0]?.id;

  if (status === 'loading' || status === 'idle') {
    return <LoadingState message="Signing you in..." className="min-h-screen" />;
  }

  if (status === 'provisioning') {
    return <LoadingState message="Setting up your account..." className="min-h-screen" />;
  }

  if (status === 'error') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <EmptyState
          title="We're having trouble loading your account."
          description="Please refresh the page or try signing out and back in."
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar restaurantId={activeRestaurantId} />
      <div className="flex w-full flex-col">
        <Topbar restaurants={restaurants} activeRestaurantId={activeRestaurantId} />
        <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-6 py-6">
          <Outlet context={{ account, restaurants, refreshRestaurants: refresh }} />
        </main>
      </div>
    </div>
  );
}
