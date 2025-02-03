import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase"; 


export const fetchCart = createAsyncThunk("cart/fetch", async (userId) => {
  const cartRef = collection(db, "users", userId, "cart");
  const cartSnapshot = await getDocs(cartRef);

  const cartItems = await Promise.all(
    cartSnapshot.docs.map(async (cartDoc) => {
      const cartData = cartDoc.data();

      
      const productRef = doc(db, "products", cartData.productId);
      const productSnapshot = await getDoc(productRef);
      if (!productSnapshot.exists()) {
        console.warn(`Product not found for cart item: ${cartDoc.id}`);
        return { id: cartDoc.id, ...cartData, product: null }; // Set product as null
      }


      const productData = productSnapshot.data();

      // Ensure `addedAt` is converted from Firestore Timestamp to Date
      if (cartData.addedAt instanceof Timestamp) {
        cartData.addedAt = cartData.addedAt.toDate().toISOString();
      }

      return {
        id: cartDoc.id, 
        ...cartData,
        product: {
          id: productSnapshot.id, 
          ...productData,
        },
      };
    })
  );
    console.log("cartItems:",cartItems);
  return cartItems;
});

// Add to cart 
export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ userId, productId ,quantity}) => {
    const cartRef = doc(db, "users", userId, "cart", productId);
    const t = await setDoc(cartRef, {
      productId,
      quantity: quantity || 1 , 
      addedAt: new Date(),
    });
    return { id: productId, quantity: 1 };
  }
);

//Update quantity 
export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ userId, id, quantity }) => {
    const cartRef = doc(db, "users", userId, "cart", id);
    if (quantity > 0) {
      await setDoc(cartRef, { productId: id, quantity }, { merge: true });
      return { id, quantity };
    } else {
      await deleteDoc(cartRef);
      return { id, quantity: 0 }; // Remove from Redux store
    }
  }
);

// Remove from cart
export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async ({ userId, id }) => {
    // here is the id coming as cart id
    const cartRef = doc(db, "users", userId, "cart", id);
     
    await deleteDoc(cartRef);
    // remove from local storage particular product
    const localCart = JSON.parse(localStorage.getItem("cart"));
    const newCart = localCart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    console.log("Local Cart:", newCart);

    return id;
  }
);

// Cart Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    status: "idle",
    error: null,
  },

  reducers: {
    updateQuantityLocally: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    updateCartLocally: (state, action) => {
      state.cartItems = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.status = "idle";
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems.push(action.payload);
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const item = state.cartItems.find((i) => i.id === action.payload.id);
        if (item) {
          item.quantity = action.payload.quantity;
        } else if (action.payload.quantity > 0) {
          state.cartItems.push(action.payload);
        }
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        console.log(action.error.message);
      })
     
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
        // state.status = "idle";
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log(action.error.message);
      });
  },
});

export default cartSlice.reducer;
export const { updateQuantityLocally , updateCartLocally} = cartSlice.actions;
