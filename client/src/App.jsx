import React from "react";
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
  Admin,
} from "./components";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div className="w-[95%] mx-auto mt-2 bg-base-800 min-h-full">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route exact path="/products">
            <Route index element={<Products />} />
          </Route>
          <Route index path="/cart" element={<Cart />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route index path="/about" element={<About />} />
        </Route>

        <Route exact path="/auth" element={<LoginAndRegister />} />

        <Route exact path="/addcategory" element={<Category />} />
        <Route exact path="/manageproducts" element={<ManageProducts />} />
      </Routes>
    </div>
  );
};

export default App;
