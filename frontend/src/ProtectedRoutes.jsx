// ProtectedRoutes.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    // User is not authenticated — redirect to login
    return <Navigate to="*" replace />;
  }

  // User is authenticated — allow access
  return children;
};
