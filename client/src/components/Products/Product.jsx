import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartThunk,
  updateToCartThunk,
} from "../../../redux/slices/cartSlice";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartSlice.cart);

  const [currentQuantity, setCurrentQuantity] = useState(1);
  const IncreaseQuantity = () => {
    setCurrentQuantity((prevQuantity) => prevQuantity + 1);
  };
  const DecreaseQuantity = () => {
    if (currentQuantity > 1) {
      setCurrentQuantity((prevQuantity) => prevQuantity - 1);
    }
    return;
  };

  const handleAddToCart = (product, quantity) => {
    const foundItemInCart =
      cart.find((item) => item?.productId === product?._id) || null;
    if (!foundItemInCart) {
      const productDetails = {
        product,
        quantity,
      };
      dispatch(addToCartThunk(productDetails));
    } else {
      const productDetails = {
        id: foundItemInCart._id,
        quantity: foundItemInCart.quantity + quantity,
      };
      dispatch(updateToCartThunk(productDetails));
    }
  };
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={product.image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        {/* <p>{product?.description}</p> */}
        <div className="flex items-center my-4 ">
          <p className="text-4xl">{product.price}$</p>
          <div className="btn-group btn-group-vertical lg:btn-group-horizontal">
            <button
              className="px-4  bg-transparent rounded-none"
              onClick={DecreaseQuantity}
            >
              -
            </button>
            <button className="btn btn-active rounded-none">
              {currentQuantity}
            </button>
            <button className="px-4 rounded-none" onClick={IncreaseQuantity}>
              +
            </button>
          </div>{" "}
        </div>
        <div className="card-actions mt-4">
          <button
            className="btn btn-ghost border-primary mr-2"
            onClick={() => handleAddToCart(product, currentQuantity)}
          >
            Add to Cart
          </button>
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
