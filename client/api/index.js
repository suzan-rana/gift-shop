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
