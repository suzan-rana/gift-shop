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

export const loginUser = (formData) => api.post("/user/login", formData);
export const registerUser = (formData) => api.post("/user/register", formData);

//products
// export const createProducts = (productData, imageData) =>
//   api.post("/product", {
//     body: productData,
//     files: imageData,
//   });
export const getProducts = () => api.get('/product')
export const createProducts = (formData, config) =>
  api.post("/product", formData, config);

//category
export const addCategory = (formData, config) =>
  api.post("/category", formData, config);

export const getCategory = () => api.get("/category");


//cart
// export const addToCart = (id) => api.post('/cart', )