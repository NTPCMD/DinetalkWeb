import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import PortalLayout from './layouts/PortalLayout';
import LoginPage from './pages/LoginPage';
import RestaurantsPage from './pages/RestaurantsPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import HoursPage from './pages/HoursPage';
import BookingRulesPage from './pages/BookingRulesPage';
import CallsPage from './pages/CallsPage';
import { AuthProvider, useAuth } from './hooks/useAuth';

function ProtectedRoute() {
  const { session, account, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div style={{ padding: 24 }}>Loading…</div>;
  if (!session) return <Navigate to="/login" replace state={{ from: location }} />;
  if (!account) return <div style={{ padding: 24 }}>Account not found.</div>;

  return <Outlet />;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/restaurants" />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route element={<PortalLayout />}>
            <Route path="/r/:id/dashboard" element={<DashboardPage />} />
            <Route path="/r/:id/settings" element={<SettingsPage />} />
            <Route path="/r/:id/hours" element={<HoursPage />} />
            <Route path="/r/:id/rules" element={<BookingRulesPage />} />
            <Route path="/r/:id/calls" element={<CallsPage />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}
