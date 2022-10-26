import { createSlice, createAsyncThunk, current  } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../api";
import jwt_decode from "jwt-decode";


const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "",
    data: {
      email: "",
      id: "",
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      
      state.status = "SUCCESS";
      state.data.email = action.payload.email;
      state.data.username = action.payload.username;
      state.data.id = action.payload.id;
      console.log(current(state))
    });
  },
});

export default authSlice.reducer;

export const loginUserThunk = createAsyncThunk(
  "auth/loginuser",
  async (formData) => {
    const { data } = await loginUser(formData);
    console.log(data);
    if (data?.status === "success") {
      let decodedData = jwt_decode(data?.token);
      return decodedData;
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  "auth/registeruser",
  async (formData) => {
    const { data } = await registerUser(formData);
    console.log(data);
  }
);
