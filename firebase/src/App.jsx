import React, { useEffect } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ProtectedLayout from "./components/ProtectedLayout";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/ProductList";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/Cart";
import Notfound from "./pages/Notfound";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import SidebarLayout from "./components/SidebarLayout";
import UserOrderPage from "./pages/UserOrderPage";
import AdminSidebarLayout from "./components/admin/AdminSidebarLayouts";
import AllProducts from "./components/admin/AllProducts";
import AddProduct from "./components/admin/AddProduct";
import AllOrders from "./components/admin/AllOrders";
import EditProduct from "./components/admin/EditProduct";
import { onMessage } from "firebase/messaging";
import { messaging } from "./firebase";

function App() {

  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log("Foreground Message Received:", payload);

   
      // 🔹 Show notification manually
      if (Notification.permission === "granted") {
        new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: "/firebase-logo.png",
        });
      } else {
        console.warn("Notification permission is not granted!");
      }
    });
  }, []);

  return (
    <>
   
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductList />} />
        <Route
          path="/product-detail/:productId"
          element={<ProductDetailsPage />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/not-found" element={<Notfound />} />

        {/* User and Admin both protected */}
        <Route element={<ProtectedLayout allowedRoles={["user", "admin"]} />}>
          {/* This layout only see in user dashboard----------------- */}
          <Route element={<SidebarLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/orders" element={<UserOrderPage />} />
          </Route>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/order-confirmation/:orderId"
            element={<OrderConfirmation />}
          />
        </Route>

        {/* Admin protected */}
        <Route element={<ProtectedLayout allowedRoles={["admin"]} />}>
          <Route element={<AdminSidebarLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/dashboard/products" element={<AllProducts />} />
            <Route
              path="/admin/dashboard/add-product"
              element={<AddProduct />}
            />
            <Route
              path="/admin/dashboard/edit-product/:productId"
              element={<EditProduct />}
            />
            <Route path="/admin/dashboard/all-orders" element={<AllOrders />} />
          </Route>
        </Route>

        {/* <Route path="/add-product" element={<AddProduct />} /> */}
      </Routes>
    </>
  );
}

export default App;
