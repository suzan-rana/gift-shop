import React from "react";

const Navbar = () => {
  return (
    <div className="w-[95%] mx-auto mt-2">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">My Gift Shop</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0 mr-12">
            <li>
              <a>Products</a>
            </li>
            <li>
              <a>Cart</a>
            </li>
            <li>
              <a>About us</a>
            </li>
            <li className="ml-6">
              <a className="btn btn-primary">Login</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
