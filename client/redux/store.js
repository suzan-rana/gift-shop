import { configureStore  } from '@reduxjs/toolkit'
import productsReducer from './slices/productSlice'
import authReducer from './slices/authSlice'
import categoryReducer from './slices/categorySlice'
const store = configureStore({
    reducer: {
        productSlice: productsReducer,
        authSlice : authReducer,
        categorySlice: categoryReducer,
    }
})
export default store;