import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../api";
import jwt_decode from "jwt-decode";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "",
    data: null,
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      state.data = action.payload
      console.log(current(state));
    });
  },
});

export default authSlice.reducer;

export const loginUserThunk = createAsyncThunk(
  "auth/loginuser",
  async (formData) => {
    const { data } = await loginUser(formData);
    localStorage.setItem("token", JSON.stringify(data.token));
    if (data?.status === "success") {
      let decodedData = jwt_decode(data?.token);
      localStorage.setItem('user', JSON.stringify(decodedData))
      return decodedData;
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  "auth/registeruser",
  async (formData) => {
    const { data } = await registerUser(formData);
    localStorage.setItem("token", JSON.stringify(data.token));
    if (data?.status === "success") {
      let decodedData = jwt_decode(data?.token);
      return decodedData;
    }
  }
);


// code
// : 
// "ERR_BAD_REQUEST"
// config
// : 
// {transitional: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, adapter: ƒ, …}
// message
// : 
// "Request failed with status code 401"
// name
// : 
// "AxiosError"
// request
// : 
// XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
// response
// : 
// config
// : 
// {transitional: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, adapter: ƒ, …}
// data
// : 
// {status: 'error', message: 'Token expired .You need to login again '}
// headers
// : 
// AxiosHeaders {content-length: '70', content-type: 'application/json; charset=utf-8', Symbol(defaults): null}
// request
// : 
// XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
// status
// : 
// 401
// statusText
// : 
// "Unauthorized"
// [[Prototype]]
// : 
// Object