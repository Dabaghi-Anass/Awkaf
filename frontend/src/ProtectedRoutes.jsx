import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    // Check for expiration
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (decoded.exp && decoded.exp < currentTime) {
      // Token has expired
      localStorage.removeItem("accessToken");
      return <Navigate to="/login" replace />;
    }

    return children; // Token is valid, render protected route
  } catch (err) {
    // Token is malformed or invalid
    localStorage.removeItem("accessToken");
    return <Navigate to="/login" replace />;
  }
};
