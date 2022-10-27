import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    productSlice: productsReducer,
    authSlice: authReducer,
    categorySlice: categoryReducer,
    cartSlice: cartReducer,
  },
});
export default store;
