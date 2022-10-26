import { createSlice, current } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    status: "Active",
    products: [
      {
        name: "Umbrella",
        price: 89,
        quantity: 32,
      },
    ],
  },
  reducers: {
    show: (state, action) => {
      console.log(current(state));
    },
  },
});
export default productSlice.reducer;
export const { show } = productSlice.actions;
