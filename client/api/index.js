import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8000" });
api.interceptors.request.use((req) => {
  const tokenToBeSent = localStorage.getItem("token") || null;
  if (tokenToBeSent) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("token")
    )}`;
  }

  return req;
});

//user authentication
export const loginUser = (formData) => api.post("/user/login", formData);
export const registerUser = (formData) => api.post("/user/register", formData);

//products
export const getProducts = () => api.get("/product");
export const createProducts = (formData, config) =>
  api.post("/product", formData, config);

//category
export const getCategory = () => api.get("/category");
export const addCategory = (formData, config) =>
  api.post("/category", formData, config);

//cart
export const getCartItems = () => api.get("/cart");
export const addToCart = ({ product, quantity }) =>
  api.post("/cart", { product, quantity });
