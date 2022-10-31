import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Navbar,
  Products,
  LoginAndRegister,
  Cart,
  About,
  Footer,
  ManageProducts,
  Category,
  Admin, Home,
  ProtectRoutes, Layout
} from "./components";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  redirect,
} from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="/auth" element={<LoginAndRegister />} />

        {/* protected routes */}
        <Route element={<ProtectRoutes />}>
          <Route element={<Navbar />}>
            
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />{" "}
          </Route>
          <Route path="/manageproducts" element={<ManageProducts />} />
          <Route path="/addcategory" element={<Category />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
