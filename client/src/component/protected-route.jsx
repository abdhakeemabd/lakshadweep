import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
