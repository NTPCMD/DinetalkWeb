import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRestaurants } from '@/hooks/useRestaurants';
import { Restaurant } from '@/types';

export default function PortalLayout() {
  const { account, signOut } = useAuth();
  const { restaurants, loading } = useRestaurants(account?.id);
  const navigate = useNavigate();
  const params = useParams();
  const [selectedId, setSelectedId] = useState<string | undefined>(() =>
    localStorage.getItem('portal:lastRestaurant') || undefined,
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (params.id) {
      setSelectedId(params.id);
      localStorage.setItem('portal:lastRestaurant', params.id);
      setMenuOpen(false);
    }
  }, [params.id]);

  useEffect(() => {
    if (!selectedId && restaurants.length > 0) {
      const fallback = restaurants[0].id;
      setSelectedId(fallback);
      localStorage.setItem('portal:lastRestaurant', fallback);
      navigate(`/r/${fallback}/dashboard`, { replace: true });
    }
  }, [selectedId, restaurants, navigate]);

  const currentRestaurant: Restaurant | undefined = useMemo(
    () => restaurants.find((r) => r.id === selectedId),
    [restaurants, selectedId],
  );

  const navLinks = currentRestaurant
    ? [
        { to: `/r/${currentRestaurant.id}/dashboard`, label: 'Dashboard' },
        { to: `/r/${currentRestaurant.id}/settings`, label: 'Settings' },
        { to: `/r/${currentRestaurant.id}/hours`, label: 'Hours' },
        { to: `/r/${currentRestaurant.id}/rules`, label: 'Booking Rules' },
        { to: `/r/${currentRestaurant.id}/calls`, label: 'Calls' },
      ]
    : [];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    localStorage.setItem('portal:lastRestaurant', id);
    navigate(`/r/${id}/dashboard`);
    setMenuOpen(false);
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div>
            <div className="text-sm text-muted">Account</div>
            <div className="font-semibold">{account?.name ?? 'N/A'}</div>
          </div>
          <button
            className="icon-button hide-desktop"
            type="button"
            aria-label="Close navigation"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="mb-4">
          <div className="text-sm text-muted">Restaurant</div>
          {loading && <div>Loading…</div>}
          {!loading && restaurants.length === 0 && <div>No restaurants</div>}
          {!loading && restaurants.length > 0 && (
            <select
              className="select"
              value={selectedId}
              onChange={(e) => handleSelect(e.target.value)}
            >
              {restaurants.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <nav className="mb-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button className="button secondary" onClick={signOut}>
          Logout
        </button>
      </aside>
      {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}
      <main className="content">
        <div className="mobile-topbar">
          <button
            className="icon-button"
            type="button"
            aria-label="Open navigation"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
          <div className="mobile-topbar__titles">
            <div className="mobile-topbar__account">{account?.name ?? 'Account'}</div>
            <div className="mobile-topbar__restaurant">
              {currentRestaurant ? currentRestaurant.name : 'Select a restaurant'}
            </div>
          </div>
          <button className="link-button" type="button" onClick={signOut}>
            Logout
          </button>
        </div>
        <Outlet context={{ restaurant: currentRestaurant, restaurants }} />
      </main>
    </div>
  );
}
