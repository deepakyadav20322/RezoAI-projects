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
  where,
  getDoc,
} from "firebase/firestore";

// Fetch all orders
export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const q = query(collection(db, "orders"));
      const querySnapshot = await getDocs(q);
      const orders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return orders;
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred while fetching orders');
    }
  }
);

// Add a new order
export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async (order, { rejectWithValue }) => {
    try {
      const newDocRef = doc(collection(db, "orders"));
      const newOrder = { ...order, id: newDocRef.id };
      await setDoc(newDocRef, newOrder);
      return newOrder;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update an existing order
export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ orderId, updatedData }, { rejectWithValue }) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, updatedData);
      return { orderId, updatedData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete an order
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async ({ orderId }, { rejectWithValue }) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await deleteDoc(orderRef);
      return orderId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch order by ID
export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      const orderSnap = await getDoc(orderRef);

      if (orderSnap.exists()) {
        return { id: orderSnap.id, ...orderSnap.data() };
      } else {
        return rejectWithValue("Order not found");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  orders: [],
  orderDetails: null,
  loading: false,
  error: null,
};

// Slice
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        const { orderId, updatedData } = action.payload;
        const index = state.orders.findIndex((order) => order.id === orderId);
        if (index !== -1) {
          state.orders[index] = { ...state.orders[index], ...updatedData };
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter((order) => order.id !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
