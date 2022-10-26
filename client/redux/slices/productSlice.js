import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProducts } from "../../api";

const productSlice = createSlice({
  name: "products",
  initialState: {
    status: "Active",
    products: [],
  },
 
});
export default productSlice.reducer;

export const createProductsThunk = createAsyncThunk(
  "products/createproductsthunk",
  async (formData, config) => {
    const { data } = await createProducts(formData, config);
    console.log(data);
    return data;
  }
);

