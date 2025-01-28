import { configureStore } from "@reduxjs/toolkit";
import productSliceReducer from "../features/products/ProductSlice";
import  productAPI from "../features/products/ProductAPI";
import cartReducer from "../features/cart/CartSlice";
 const store  = configureStore({
    reducer:{
        product: productSliceReducer,
        cart: cartReducer,
        [productAPI.reducerPath]: productAPI.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(productAPI.middleware)


    
 });

 export default store;
