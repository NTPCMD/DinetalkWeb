import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { PortalLayout } from '@/components/layout/PortalLayout';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import AuthCallbackPage from '@/pages/AuthCallbackPage';
import RestaurantsPage from '@/pages/RestaurantsPage';
import CallsPage from '@/pages/CallsPage';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter basename="/portal">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<PortalLayout />}>
              <Route index element={<Navigate to="/restaurants" replace />} />
              <Route path="/restaurants" element={<RestaurantsPage />} />
              <Route path="/r/:restaurantId/calls" element={<CallsPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/restaurants" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
