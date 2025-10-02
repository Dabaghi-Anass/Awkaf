import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const PrivateRouterAdmin = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    fetch("http://127.0.0.1:8000/apif/me/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((user) => {
        if (user.is_staff === 1 || user.is_staff === true) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      })
      .catch(() => setIsAuthorized(false));
  }, []);

  if (isAuthorized === null) return <div>جاري التحقق من صلاحيات المسؤول...</div>;

  return isAuthorized ? children : <Navigate to="/home" replace />;
};
