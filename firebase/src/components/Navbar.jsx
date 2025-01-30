import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { clearUser } from "../features/auth/AuthSlice";
import { signOut } from "firebase/auth";
import { fetchCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

const Navbar = () => {


 
  const {user,loading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
    useEffect(() => {
    if (user) {
      dispatch(fetchCart(user.uid));

    }
  }, [user, dispatch]);

  //  const handleLogout =async () => {
  // try {
  //   // Sign out from Firebase Auth
    
    

  //   // const user = JSON.stringify(localStorage.getItem("user"));
  //   // const userId = user.uid;
    
  // const cartSnapshot = await dispatch(fetchCart(user.uid)).unwrap();
  // if (cartSnapshot) {
  //   // Store the cart items into local storage
  //   localStorage.setItem("cart", JSON.stringify(cartSnapshot));

  //   toast.success("Cart saved locally");
  //   await signOut(auth);

  //   dispatch(clearUser());
  //   localStorage.removeItem("user");
  //   window.location.href = "/login";
  //   console.log("User signed out");
  // }
    
    
   
  // }
  // catch (error) {
  //   console.error("Error during sign-out: ", error.message);
  // }
   
  //  }

  const handleLogout = async () => {
    try {
      // Get user ID before signing out
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) throw new Error("User not found in localStorage");
  
      const userId = user.uid;
  
      // Fetch the cart from Firestore
      const cartSnapshot = await dispatch(fetchCart(userId)).unwrap();
  
      if (cartSnapshot) {
        // Store the cart items into local storage
        console.log("Cart Snapshot:", cartSnapshot.product);
        localStorage.setItem("cart", JSON.stringify(cartSnapshot));
      
      }
  
      // Sign out from Firebase Auth
      await signOut(auth);
  
      // Clear user-related data
      clearUser();
      localStorage.removeItem("user");
  
      // Redirect to login page
      window.location.href = "/login";
      console.log("User signed out");
    } catch (error) {
      console.error("Error during sign-out: ", error.message);
    }
  };


  return (
    <nav className="w-full bg-gray-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Left: Logo */}
        <Link to={'/'} className="text-2xl font-bold">MyWebsite</Link>

        {/* Center: Links */}
        <div className="hidden sm:flex space-x-6">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-gray-400">
           Dashboard
          </Link>
          <Link to="/product" className="hover:text-gray-400">
           products
          </Link>
          <Link to="/cart" className="hover:text-gray-400">
            Cart
          </Link>
          <Link to="/admin/dashboard" className="hover:text-gray-400">
           Admin-Dashboard
          </Link>
        </div>

        {/* Right: Profile/Login */}
        <div className="relative">
  {loading ? (
    <div className="flex items-center space-x-4">
      {/* Loading Skeleton */}
      <div className="w-8 h-8  border-t-transparent border-white bg-slate-300 rounded-full animate-pulse"></div>
      <div className="w-34 h-8 bg-slate-300 rounded-md animate-pulse"></div>
    </div>
  ) : user ? (
    <div className="flex items-center space-x-4">
      {/* Profile Section */}
      <div className="flex items-center space-x-2">
        <div className="relative group flex gap-4">
          <FaUserCircle size={30} className="cursor-pointer text-white" />
          {/* Tooltip */}
          <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-md shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-sm mb-2">Email: {user?.email}</p>
            <button
              className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
        {/* Display User Email */}
        <span className="text-sm font-semibold text-white">{user?.email}</span>
      </div>
    </div>
  ) : (
    <div className="flex space-x-4">
      {/* Login/Register Links */}
      <Link
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
        to={"/login"}
      >
        Login
      </Link>
      <Link
        className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-800 transition"
        to={"/register"}
      >
        Register
      </Link>
    </div>
  )}
</div>

      </div>
    </nav>
  );
};

export default Navbar;
