
import React from "react";
import { useSelector } from "react-redux";
import { Navigate,  Outlet } from "react-router-dom";
import Loader from "./Loader";

const ProtectedLayout = ({ allowedRoles }) => {
  const {user,loading} = useSelector((state) => state.auth);
  
  if (loading) {
    return (<Loader/>) // Show a loading state instead of redirecting
  }

  if (!user && !loading) {
     console.log("user not found",user)
    return <Navigate to="/login"  />;
  }

  if ( !allowedRoles.includes(user.role)) {
  
    return <Navigate to="/" state={{ error: "you are Unauthorized" }} />;
  }

  // If authenticated and authorized, render the nested routes
  return <Outlet />;
};


export default ProtectedLayout;
