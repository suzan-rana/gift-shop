import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { addToCart, getCartItems } from "../../api";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.cart.push(action.payload.data.data);
        console.log(current(state.cart));
      })
      .addCase(getCartItemsThunk.fulfilled, (state, action) => {
        state.cart = action.payload.data;
      });
  },
});
export default cartSlice.reducer;

export const addToCartThunk = createAsyncThunk(
  "cart/addtocartthunk",
  async (productDetails) => {
    try {
      console.log(productDetails);
      const { data, status } = await addToCart(productDetails);
      console.log(data);
      return { data, status };
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCartItemsThunk = createAsyncThunk("cart/getcartthunk", async () => {
  try {
    const { data } = await getCartItems();
    return data;
  } catch (error) {
    console.log(error);
  }
});
