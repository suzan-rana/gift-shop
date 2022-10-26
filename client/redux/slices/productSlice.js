import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProducts, addCategory } from "../../api";

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

export const addCategoryThunk = createAsyncThunk(
  "products/addcategory",
  async (category) => {
    const { data } = await addCategory(category)
    return data;
  }
);
