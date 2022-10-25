import { configureStore  } from '@reduxjs/toolkit'
import productsReducer from './slices/productSlice'
const store = configureStore({
    reducer: {
        productStore: productsReducer
    }
})
export default store;