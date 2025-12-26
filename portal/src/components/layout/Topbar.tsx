import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RestaurantSwitcher } from '@/components/common/RestaurantSwitcher';
import type { Restaurant } from '@/types';
import { useAuthContext } from '@/context/AuthContext';

interface Props {
  restaurants: Restaurant[];
  activeRestaurantId?: string;
}

export function Topbar({ restaurants, activeRestaurantId }: Props) {
  const { session, signOut } = useAuthContext();
  const navigate = useNavigate();

  const handleSelect = (id: string) => {
    navigate(`/r/${id}/calls`);
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-4">
        {restaurants.length > 0 ? (
          <RestaurantSwitcher restaurants={restaurants} activeId={activeRestaurantId} onSelect={handleSelect} />
        ) : (
          <div className="text-sm font-medium text-slate-500">No restaurants yet</div>
        )}
      </div>
      <div className="flex items-center gap-3 text-sm text-slate-700">
        <div className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
          {session?.user.email}
        </div>
        <Button variant="outline" size="sm" onClick={() => signOut().then(() => navigate('/login'))}>
          Sign out
        </Button>
      </div>
    </header>
  );
}
