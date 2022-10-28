import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToCart, getCartDetails } from "../../api";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: []
  },
  extraReducers: builder => {
    builder.addCase(addToCartThunk.fulfilled, (state, action) => {

    })
  }
});
export default cartSlice.reducer;

export const addToCartThunk = createAsyncThunk(
  "cart/addtocartthunk",
  async (id) => {
    try {
      const { data } = await addToCart(id);
      return data;
    } catch (error) {
      console.log(error);
    }
    const { data } = await addToCart(id);
    return data;
  }
);
