import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-[95%] mx-auto mt-2 bg-base-800 min-h-full">
      <Outlet />
    </div>
  );
};

export default Layout;
