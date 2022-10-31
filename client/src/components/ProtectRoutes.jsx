import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectRoutes = () => {
  const location = useLocation();
  // const user = useSelector((state) => state.authSlice.data);
  const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState(userFromLocalStorage);
  useEffect(() => {
    setUserData(userFromLocalStorage);
  }, []);
  return (
    <div>
      {userData ? (
        <Outlet />
      ) : (
        <Navigate to="/auth" state={{ from: location }} replace />
      )}
    </div>
  );
};

export default ProtectRoutes;
