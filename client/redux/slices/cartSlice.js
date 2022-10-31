import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { addToCart, getCartItems, updateCart } from "../../api";

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
        console.log("This is cart in REdux storer", current(state.cart));
      }).addCase(updateToCartThunk.fulfilled, (state, action) => {
        // console.log('This is actioin.Payload;========', action.payload)
        // console.log('This is actioin.Payload;========', action.payload)
        // console.log('This is actioin.Payload;========', action.payload)
        // console.log('This is actioin.Payload;========', action.payload)
          const updatedCart = state.cart.map((item) => {
            if(item._id === action.payload.data._id){
              return action.payload.data
            }else{
              return item;
            }
          })
          state.cart = updatedCart;
          console.log('This is updated Cart==========', state.cart)
          console.log('This is updated Cart==========', state.cart)
          console.log('This is updated Cart==========', state.cart)
          console.log('This is updated Cart==========', state.cart)
          console.log('This is updated Cart==========', state.cart)
      
      })
      .addCase(getCartItemsThunk.fulfilled, (state, action) => {
        state.cart = action.payload.data;
        console.log('Cart items from database===============', state.cart)
        console.log('Cart items from database===============', state.cart)
        console.log('Cart items from database===============', state.cart)
        console.log('Cart items from database===============', state.cart)
        console.log('Cart items from database===============', state.cart)
        console.log('Cart items from database===============', state.cart)
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
      console.log(data)
      return data;
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