import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { verifyUser } from "@/VerifyUser";
import { Loader } from "@/Components/Loader";


export const PrivateRouterAdmin = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const checkAdminAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setIsAuthorized(false);
        return;
      }

      try {
        const user = await verifyUser(token);
        const isStaff = user.is_staff === 1 || user.is_staff === true;
        setIsAuthorized(isStaff);
      } catch (err) {
        console.error("Admin authentication failed:", err);
        localStorage.removeItem("accessToken");
        setIsAuthorized(false);
      }
    };

    checkAdminAuth();
  }, []);

  if (isAuthorized === null) return <Loader />;

  return isAuthorized ? children : <Navigate to="/Home/" replace />;
};