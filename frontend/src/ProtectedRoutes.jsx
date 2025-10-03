
import { Loader } from './Components/Loader';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null); // null = loading
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setAuthorized(false);
      return;
    }

    // Fetch user data from /me/
    fetch("http://127.0.0.1:8000/apif/me/", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(user => {
        const isStaff = user.is_staff === 1 || user.is_staff === true;
       

        // If trying to access DashboardAdmin and not admin
        if (location.pathname === "/DashboardAdmin" && !isStaff) {
          setAuthorized(false);
        } else {
          setAuthorized(true);
        }
      })
      .catch(err => {
        console.error("Fetch failed:", err);
        localStorage.removeItem("accessToken");
        setAuthorized(false);
      });
  }, [location.pathname]);

  if (authorized === null) return <Loader/>;

  return authorized ? children : <Navigate to="/" replace />;
};
