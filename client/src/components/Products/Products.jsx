import React from "react";
import Product from "./Product";

const Products = () => {
  return (
    <div className="grid grid-cols-4 gap-12 px-8 mx-auto ">
      <Product />
      <Product />
      <Product />
      <Product />
    </div>
  );
};

export default Products;
  