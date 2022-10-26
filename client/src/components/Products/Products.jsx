import React from "react";
import Product from "./Product";

const Products = () => {
  return (
    <div className="px-2 md:px-6">
      <div className="my-8">
        <h1 className="text-center text-3xl my-6 ">Shop from wide varities of Products</h1>
        <div className="flex flex-col md:flex-row  items-center justify-center  gap-4">
          <select className="my-4 select select-bordered w-full max-w-xs">
            <option disabled selected>
              Category
            </option>
            <option>All Products</option>
            <option>Homer</option>
            <option>Marge</option>
            <option>Bart</option>
            <option>Lisa</option>
            <option>Maggie</option>
          </select>
          <input
            type="text"
            placeholder="Search for your products"
            className="input input-bordered w-full max-w-xs"
          />
          <button className="btn btn-primary">Search</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12  mx-auto ">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
      
    </div>
  );
};

export default Products;
