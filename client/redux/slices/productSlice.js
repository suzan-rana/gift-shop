import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    status: 'Active',
    products: [ 
      {
        name: "Umbrella",
        price: 89,
        quantity: 32,
      },
    ],
  },
  extraReducers: (builder) => {},
});
export default productSlice.reducer;
