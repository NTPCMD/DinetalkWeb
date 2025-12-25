import { useOutletContext } from 'react-router-dom';
import type { Restaurant } from '@/types';

export default function DashboardPage() {
  const { restaurant } = useOutletContext<{ restaurant?: Restaurant }>();

  if (!restaurant) return <div className="card">Select a restaurant to view the dashboard.</div>;

  return (
    <div>
      <div className="header">
        <div>
          <div className="text-muted">Restaurant</div>
          <h2>{restaurant.name}</h2>
        </div>
        <div className="badge">Timezone: {restaurant.timezone}</div>
      </div>
      <div className="card">
        <h3>Welcome back</h3>
        <p className="text-muted">
          Use the navigation to manage settings, hours, booking rules, and review calls.
        </p>
      </div>
    </div>
  );
}
