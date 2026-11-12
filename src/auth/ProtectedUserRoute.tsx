import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedUserRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-soft-lavender/30">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-electric-violet border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-deep-charcoal/70">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location, requireSignIn: true }} replace />;
  }

  return <>{children}</>;
};
