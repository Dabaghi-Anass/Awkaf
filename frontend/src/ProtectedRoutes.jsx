import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  return accessToken ? children : <Navigate to="/AdminLogin" />;
};
