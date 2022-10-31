import React from "react";
import { useSelector } from "react-redux";

const Checkout = () => {
  const totalQty = useSelector((state) => state.cartSlice.totalItems);
  const totalPrice = useSelector((state) => state.cartSlice.totalPrice);
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body ">
        <h2 className="card-title">Proceed to Checkout</h2>
        <div className="flex justify-between items-center my-4">
          <span className="text-xl">Total Quantity: </span>
          <span className="text-3xl">{totalQty} <span className="text-xl">items</span> </span>
        </div>
        <div className="flex justify-between items-center my-4">
          <span className="text-xl">Total Price:</span>
          <span className="text-3xl">{totalPrice} $</span>
        </div>

        <div className="card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
