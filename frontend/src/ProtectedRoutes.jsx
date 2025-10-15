import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader } from './Components/Loader';
import { verifyUser } from './VerifyUser';


export const ProtectedRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setAuthorized(false);
        return;
      }

      try {
        const user = await verifyUser(token);
        const isStaff = user.is_staff === 1 || user.is_staff === true;

        // Prevent non-admin users from accessing DashboardAdmin
        if (location.pathname === "/DashboardAdmin/" && !isStaff) {
          setAuthorized(false);
        } else {
          setAuthorized(true);
        }
      } catch (err) {
        console.error("Authentication failed:", err);
        localStorage.removeItem("accessToken");
        setAuthorized(false);
      }
    };

    checkAuth();
  }, [location.pathname]);

  if (authorized === null) return <Loader />;

  return authorized ? children : <Navigate to="/" replace />;
};