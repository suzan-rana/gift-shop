import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {  getCartDetails } from "../../api";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: []
  },

});
export default cartSlice.reducer;

// export const addToCartThunk = createAsyncThunk(
//   "cart/addtocartthunk",
//   async (id) => {
//     try {
//       const { data } = await addToCart(id);
//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//     const { data } = await addToCart(id);
//     return data;
//   }
// );
