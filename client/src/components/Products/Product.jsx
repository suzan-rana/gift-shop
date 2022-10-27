import React from "react";

const Product = ({ product }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={product.image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>Quantity</p>
        <div className="card-actions mt-4">
          <button className="btn btn-ghost border-primary mr-2">
            Add to Cart
          </button>
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
