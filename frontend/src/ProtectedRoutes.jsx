import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp && decoded.exp < currentTime) {
      localStorage.removeItem("accessToken");
      return <Navigate to="/login" replace />;
    }

    // Si la page est réservée aux admins et l'utilisateur n'est pas admin
    if (adminOnly && !decoded.is_admin) {
      return <Navigate to="/home" replace />;
    }

    return children;
  } catch (err) {
    localStorage.removeItem("accessToken");
    return <Navigate to="/dashboard" replace />;
  }
};
