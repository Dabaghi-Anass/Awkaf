import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { Loader } from "@/Components/Loader";
import { useApi } from "@/ApiProvider";

export const PrivateRouterAdmin = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const api = useApi();

  useEffect(() => {
    let isMounted = true;

    const checkAdminAuth = async () => {
      try {
        const [user, status, error] = await api.get("/me/");

        if (error || !user) {
          console.error("Authentication failed:", error);
          if (isMounted) setIsAuthorized(false);
          return;
        }

        const isStaff = user.is_staff === 1 || user.is_staff === true;
        if (isMounted) setIsAuthorized(isStaff);
      } catch (err) {
        console.error("Error during admin auth:", err);
        if (isMounted) setIsAuthorized(false);
      }
    };

    checkAdminAuth();

    return () => {
      isMounted = false;
    };
  }, [api]);

  if (isAuthorized === null) return <Loader />;

  return isAuthorized ? children : <Navigate to="/Home/" replace />;
};
