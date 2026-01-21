import { Button } from '@/app/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { PhoneCall, LogOut, LayoutDashboard, Phone } from 'lucide-react';

interface Restaurant {
  id: string;
  name: string;
}

interface HeaderProps {
  restaurants: Restaurant[];
  currentRestaurantId: string;
  onRestaurantChange: (id: string) => void;
  onLogout: () => void;
  currentView: 'dashboard' | 'calls';
  onViewChange: (view: 'dashboard' | 'calls') => void;
}

export function Header({
  restaurants,
  currentRestaurantId,
  onRestaurantChange,
  onLogout,
  currentView,
  onViewChange,
}: HeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="size-10 bg-primary rounded-full flex items-center justify-center">
              <PhoneCall className="size-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">DineTalk</h1>
              <p className="text-xs text-muted-foreground hidden md:block">Client Portal</p>
            </div>
          </div>

          {/* Navigation and Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
            {/* Restaurant Selector */}
            {restaurants.length > 0 && (
              <Select value={currentRestaurantId} onValueChange={onRestaurantChange}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Select restaurant" />
                </SelectTrigger>
                <SelectContent>
                  {restaurants.map((restaurant) => (
                    <SelectItem key={restaurant.id} value={restaurant.id}>
                      {restaurant.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {/* View Toggle - Desktop */}
            <div className="hidden md:flex gap-2">
              <Button
                variant={currentView === 'dashboard' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onViewChange('dashboard')}
              >
                <LayoutDashboard className="size-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant={currentView === 'calls' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onViewChange('calls')}
              >
                <Phone className="size-4 mr-2" />
                Call Logs
              </Button>
            </div>

            {/* Logout Button */}
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="size-4 md:mr-2" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>

        {/* View Toggle - Mobile */}
        <div className="flex md:hidden gap-2 mt-4">
          <Button
            variant={currentView === 'dashboard' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewChange('dashboard')}
            className="flex-1"
          >
            <LayoutDashboard className="size-4 mr-2" />
            Dashboard
          </Button>
          <Button
            variant={currentView === 'calls' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewChange('calls')}
            className="flex-1"
          >
            <Phone className="size-4 mr-2" />
            Calls
          </Button>
        </div>
      </div>
    </header>
  );
}
