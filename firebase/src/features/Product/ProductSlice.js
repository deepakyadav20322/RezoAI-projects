import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  getDoc,
} from "firebase/firestore";

// Fetch all products stored in Firestore
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const q = query(collection(db, "products"));
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return products;
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred while fetching products');
    }
  }
);

// Add a new product (Admin only)
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async ({ adminId, product }, { rejectWithValue }) => {
    try {
      const newDocRef = doc(collection(db, "products"));
      const newProduct = { ...product, adminId, id: newDocRef.id };
      console.log("New Product123:", newProduct);
      await setDoc(newDocRef, newProduct);
      return newProduct;
    } catch (error) {
        console.log("Error123:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Update an existing product (Admin only)
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ productId, updatedData }, { rejectWithValue }) => {
    try {
      // Debugging the values
      console.log("productId:", productId);
      console.log("updatedData:", updatedData);

      // Check if updatedData is an object
      if (typeof updatedData !== "object" || updatedData === null) {
        throw new Error("Updated data must be an object.");
      }

      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, updatedData);
      
      return { productId, updatedData };
    } catch (error) {
      console.error("Error updating product:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Delete a product (Admin only)
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const productRef = doc(db, "products", productId);
      await deleteDoc(productRef);
      return productId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


 export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const productRef = doc(db, "products", productId);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        return { id: productSnap.id, ...productSnap.data() };
      } else {
        return rejectWithValue("Product not found");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
 )


// Initial state
const initialState = {
  products: [],
  productDetails: null,
  loading: false,
  error: null,
};

// Slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      // Fetch Admin Products
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const { productId, updatedData } = action.payload;
        const index = state.products.findIndex((product) => product.id === productId);
        if (index !== -1) {
          state.products[index] = { ...state.products[index], ...updatedData };
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((product) => product.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      }
      )
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


  },
});


export default productSlice.reducer;
