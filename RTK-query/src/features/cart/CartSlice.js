
    import { createSlice } from '@reduxjs/toolkit';

    const initialState = {
        cartItems: [],
        totalQuantity: 0,
       totalPrice: 0,

    };

    const cartSlice = createSlice({
        name: 'cart',
        initialState,
        reducers: {
            addToCart: (state, action) => {
                const product = action.payload; 
              
                const existingProduct = state.cartItems.find(item => item.id === product.id);
          
                if (existingProduct) {
                  
                  existingProduct.quantity += 1;
                } else {
                 
                  state.cartItems.push({ ...product, quantity: 1 });
                }
                let totalQuantity = 0;
                let totalPrice = 0;
          
                
                for (const item of state.cartItems) {
                  totalQuantity += item.quantity; 
                  totalPrice += item.price * item.quantity; 
                }
          
                
                state.totalQuantity = totalQuantity;
                state.totalPrice = totalPrice;
              },
        }
    });


    export default cartSlice.reducer;
    export const {addToCart} = cartSlice.actions;