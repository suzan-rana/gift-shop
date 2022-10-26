import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:8000'})

export const loginUser = (formData) => api.post('/user/login', formData)
export const registerUser = (formData) => api.post('/user/register', formData)