import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loader } from "./Components/Loader";
import { useApi } from "./ApiProvider";

export const ProtectedRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null);
  const location = useLocation();
  const api = useApi();

  useEffect(() => {
    const checkAuth = async () => {
      const [user, status, error] = await api.get("/me/");
      
      if (error) {
        console.error("Authentication failed:", error);
        setAuthorized(false);
        return;
      }

      const isStaff = user.is_staff === 1 || user.is_staff === true;
      console.log("isStaff", isStaff);
      
      if (location.pathname === "/DashboardAdmin/" && !isStaff) {
        setAuthorized(false);
      } else {
        setAuthorized(true);
      }
    };

    checkAuth();
  }, [location.pathname, api]);

  if (authorized === null) return <Loader />;

  return authorized ? children : <Navigate to="/" replace />;
};
