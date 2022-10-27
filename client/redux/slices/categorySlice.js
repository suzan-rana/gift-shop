import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { addCategory, getCategory } from "../../api";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategoryThunk.fulfilled, (state, action) => {
      
      })
      .addCase(getCategoryThunk.fulfilled, (state, action) => {
        const category = action.payload.data
        state.category = category;
        state.status = action.payload.status
        
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
    console.log(data)
    return data;
  }
);
