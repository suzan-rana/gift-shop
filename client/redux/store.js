import { configureStore  } from '@reduxjs/toolkit'
import productsReducer from './slices/productSlice'
import authReducer from './slices/authSlice'
const store = configureStore({
    reducer: {
        productSlice: productsReducer,
        authSlice : authReducer
    }
})
export default store;