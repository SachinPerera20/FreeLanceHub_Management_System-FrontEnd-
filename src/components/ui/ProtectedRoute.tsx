import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../state/auth';
import { UserRole } from '../../types';
import { Loader2 } from 'lucide-react';
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}
export function ProtectedRoute({
  children,
  requiredRole
}: ProtectedRouteProps) {
  const {
    user,
    isLoading
  } = useAuth();
  const location = useLocation();
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>;
  }
  if (!user) {
    return <Navigate to="/login" state={{
      from: location
    }} replace />;
  }
  if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
    // Admin can access everything generally, or redirect to home if strict
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}