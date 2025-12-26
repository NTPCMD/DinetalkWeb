import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { LoadingState } from '@/components/common/LoadingState';

export function ProtectedRoute() {
  const { session, loading } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return <LoadingState message="Checking your session..." className="min-h-screen" />;
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
