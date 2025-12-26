import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Building2, PhoneCall } from 'lucide-react';

interface Props {
  restaurantId?: string;
}

export function Sidebar({ restaurantId }: Props) {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100',
      isActive ? 'bg-slate-200 text-slate-900' : 'text-slate-700'
    );

  return (
    <aside className="flex w-60 flex-col border-r border-slate-200 bg-white px-4 py-6">
      <div className="mb-6 px-2">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">DineTalk Portal</div>
        <div className="text-base font-semibold text-slate-900">Voice AI Wrapper</div>
      </div>
      <nav className="space-y-1">
        <NavLink to="/restaurants" className={navLinkClass} end>
          <Building2 className="h-4 w-4" />
          Restaurants
        </NavLink>
        {restaurantId ? (
          <NavLink to={`/r/${restaurantId}/calls`} className={navLinkClass}>
            <PhoneCall className="h-4 w-4" />
            Calls
          </NavLink>
        ) : (
          <div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-400">
            <PhoneCall className="h-4 w-4" />
            Calls
          </div>
        )}
      </nav>
      <div className="mt-auto text-xs text-slate-500">
        Voice AI Wrapper v0.1
      </div>
    </aside>
  );
}
