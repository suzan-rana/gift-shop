import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { addToCart, getCartItems, updateCart, deleteCartItem } from "../../api";

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
      })
      .addCase(updateToCartThunk.fulfilled, (state, action) => {
        const updatedCart = state?.cart?.map((item) => {
          if (item._id === action.payload.data._id) {
            return action.payload.data;
          } else {
            return item;
          }
        });
        state.cart = updatedCart;
      })
      .addCase(getCartItemsThunk.fulfilled, (state, action) => {
        state.cart = action.payload.data;
      })
      .addCase(increaseQtyThunk.fulfilled, (state, action) => {
        const updatedCart = state?.cart?.map((item) => {
          if (item._id === action.payload.data._id) {
            return action.payload.data;
          } else {
            return item;
          }
        });
        state.cart = updatedCart;
      })
      .addCase(decreaseQtyThunk.fulfilled, (state, action) => {
        const updatedCart = state.cart?.map((item) => {
          if (item._id === action?.payload.data._id) {
            return action.payload.data;
          } else {
            return item;
          }
        });
        state.cart = updatedCart;
      })
      .addCase(deleteCartItemThunk.fulfilled, (state, action) => {
        const { id, data } = action.payload;
        if (data.status === "success") {
          const updatedCartAfterRemovingItem = state.cart?.filter(
            (item) => item._id !== id
          );
          state.cart = updatedCartAfterRemovingItem
        }
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

export const getCartItemsThunk = createAsyncThunk(
  "cart/getcartthunk",
  async () => {
    try {
      const { data } = await getCartItems();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateToCartThunk = createAsyncThunk(
  "cart/updatecartthunk",
  async (productDetails) => {
    try {
      const { id, quantity } = productDetails;
      const { data } = await updateCart(id, quantity);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const increaseQtyThunk = createAsyncThunk(
  "cart/increaseqty",
  async (item) => {
    try {
      const { _id: id, quantity } = item;
      const { data } = await updateCart(id, quantity + 1);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const decreaseQtyThunk = createAsyncThunk(
  "cart/decreaseqty",
  async (item) => {
    try {
      const { _id: id, quantity } = item;
      const { data } = await updateCart(id, quantity - 1);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCartItemThunk = createAsyncThunk(
  "cart/deletecartitem",
  async (item) => {
    try {
      const { _id: id } = item;
      const { data } = await deleteCartItem(id);
      return { data, id };
    } catch (error) {
      console.log(error);
    }
  }
);

// {status: 'success', message: 'Added to cart ', data: {…}}
// data
// :
// price
// :
// 15
// productId
// :
// "635dfb8bf05fa0fb51f53892"
// quantity
// :
// 1
// user
// :
// "6358e786f944f78a7401f120"
// __v
// :
// 0
// _id
// :
// "635fac0430f6750696717fd8"
