import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProducts, getProducts } from "../../api";

const productSlice = createSlice({
  name: "products",
  initialState: {
    status: "Active",
    products: [],
    errorStatusCode: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProductsThunk.fulfilled, (state, action) => {
        state.products.push(action.payload.data);
        state.status = action.payload.status;
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.status = action.payload.status;
        state.errorStatusCode = null
      })
      .addCase(getProductsThunk.rejected, (state, action) => {
        state.errorStatusCode = action.payload;
      });
  },
});
export default productSlice.reducer;

export const createProductsThunk = createAsyncThunk(
  "products/createproductsthunk",
  async (formData, config) => {
    try {
      const { data } = await createProducts(formData, config);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error, "Thisis eror", error.message);
    }
  }
);

export const getProductsThunk = createAsyncThunk(
  "products/getproductsthunk",
  async () => {
    try {
      const { data, status } = await getProducts();
      console.log(data);
      return { data, status };
    } catch (error) {
      if (error.response.status === 401) return 401;
    }
  }
);
