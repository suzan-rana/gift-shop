import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import {
  getCartItemsThunk,
  increaseQtyThunk,
  decreaseQtyThunk,
  deleteCartItemThunk,
  calculateTotalItems,
  calculateTotalPrice,
} from "../../../redux/slices/cartSlice";
import Checkout from "./Checkout";

const TableBody = ({ item }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotalItems());
    dispatch(calculateTotalPrice());
  }, [item.quantity]);
  const increaseQty = () => {
    dispatch(increaseQtyThunk(item));
  };

  const decreaseQty = () => {
    if (item.quantity > 1) {
      dispatch(decreaseQtyThunk(item));
    }
    return;
  };
  const handleDeleteCartItem = () => {
    dispatch(deleteCartItemThunk(item)).then(() => {
      dispatch(calculateTotalItems());
    });
  };
  return (
    <>
      <td className="pl-16 text-center">
        <div
          className="block min-h-full cursor-pointer"
          onClick={() => handleDeleteCartItem(item)}
        >
          <FaTrash />
        </div>
      </td>
      <td className="w-[50%] text-center">
        <div className="font-bold">{item?.productName}</div>
      </td>
      <td className="w-[25%] text-center">
        <div className="btn-group btn-group-vertical lg:btn-group-horizontal">
          <button
            className="px-4 bg-transparent rounded-none hover:bg-base-300"
            onClick={decreaseQty}
          >
            -
          </button>
          <button className="btn bg-transparent border-none rounded-none">
            {item?.quantity}
          </button>
          <button
            className="px-4 rounded-none hover:bg-base-300"
            onClick={increaseQty}
          >
            +
          </button>
        </div>{" "}
      </td>
      <td className="w-[25%] text-center">{item?.price}</td>
    </>
  );
};

const Cart = () => {
  const cart = useSelector((state) => state.cartSlice.cart);
  const totalQuantity = useSelector((state) => state.cartSlice.totalItems);
  const totalPrice = useSelector((state) => state.cartSlice.totalPrice);
  const products = useSelector((state) => state.productSlice.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItemsThunk())
      .unwrap()
      .then(() => {
        dispatch(calculateTotalItems());
      })
      .then(() => {
        dispatch(calculateTotalPrice());
      });
  }, []);
  if (cart?.length === 0) return <h1>Sorry, no item in Cart.</h1>;
  const handleEmptyCart = () => {
    //pass
  };

  return (
    <div className="flex gap-16 my-16 flex-col md:flex-row">
      <div className="ml-6 cart overflow-x-auto w-[60%] bg-base-100">
        <table className="table bg-none ">
          <thead className="w-[100%]">
            <tr className="w-[100%]">
              <th className="text-center">Actions</th>
              <th className="text-center">Name</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Price</th>
            </tr>
          </thead>
          <tbody>
            {cart?.map((item) => (
              <tr key={item?._id}>
                <TableBody item={item} />
              </tr>
            ))}
          </tbody>
          <thead className="w-[100%]">
            <tr className="w-[100%]">
              <th>
                <button className="btn" onClick={handleEmptyCart}>
                  Remove all
                </button>
              </th>
              <th className="text-center">Total</th>
              <th className="text-center">{totalQuantity} &nbsp; items</th>
              <th className="text-center">{totalPrice}$</th>
            </tr>
          </thead>
        </table>
      </div>
      <div>
        <Checkout />
      </div>
    </div>
  );
};

export default Cart;
