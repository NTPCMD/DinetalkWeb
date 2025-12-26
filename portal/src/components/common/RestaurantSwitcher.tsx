import { ChevronDown } from 'lucide-react';
import type { Restaurant } from '@/types';
import { cn } from '@/lib/utils';

interface Props {
  restaurants: Restaurant[];
  activeId?: string;
  onSelect: (id: string) => void;
}

export function RestaurantSwitcher({ restaurants, activeId, onSelect }: Props) {
  const active = restaurants.find((r) => r.id === activeId) ?? restaurants[0];

  return (
    <div className="relative inline-block text-left">
      <select
        value={active?.id ?? ''}
        onChange={(e) => onSelect(e.target.value)}
        className={cn(
          'flex h-10 min-w-[220px] appearance-none items-center rounded-md border border-slate-200 bg-white px-3 pr-9 text-sm font-medium text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary'
        )}
      >
        {restaurants.map((restaurant) => (
          <option key={restaurant.id} value={restaurant.id}>
            {restaurant.name}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
    </div>
  );
}
