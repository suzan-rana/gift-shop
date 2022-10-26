import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { addCategory } from "../../api";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategoryThunk.fulfilled, (state, action) => {
        state.category.push(action.payload.data.name);
        state.status = action.payload.status;
      })
      .addCase(getCategoryThunk.fulfilled, (state, action) => {
        //
      });
  },
});
export default categorySlice.reducer;

export const addCategoryThunk = createAsyncThunk(
  "products/addcategory",
  async (formData, config) => {
    const { data } = await addCategory(formData, config);
    console.log(data);
    return data;
  }
);

export const getCategoryThunk = createAsyncThunk(
  "category/getCategory",
  async () => {
    const { data } = await getCategory();
    return data;
  }
);
