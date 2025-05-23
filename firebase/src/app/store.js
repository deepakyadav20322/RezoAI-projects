
import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/AuthSlice"
import productReducer from "../features/Product/ProductSlice"
import cartReducer from "../features/cart/cartSlice"
const store= configureStore({
    reducer:{   
        auth:authReducer,
        products: productReducer,
        cart: cartReducer
    }
});

export default store;