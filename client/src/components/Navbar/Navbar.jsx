import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Footer } from '../index'

const Navbar = () => {
  return (
    <div>
      <div>
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost normal-case text-xl">
              My Gift Shop
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal p-0 mr-12">
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li className="mx-2">
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/about">About us</Link>
              </li>
              <li className="ml-6">
                <Link to="/auth" className="btn btn-primary">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Outlet />
      <Footer />
    </div>
  );
};

export default Navbar;
