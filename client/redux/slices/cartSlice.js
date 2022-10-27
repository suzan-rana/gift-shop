import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createCart, getCart } from "../../api";

const cartSlice = createSlice({
    name: 'cart',
    initialState,
})
export default cartSlice.reducer