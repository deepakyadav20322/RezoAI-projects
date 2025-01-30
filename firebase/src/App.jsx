
import React from 'react'
import Login from './pages/Login'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import ProtectedLayout from './components/ProtectedLayout'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/admin/Dashboard'
import ProductList from './pages/ProductList'
import ProductDetailsPage from './pages/ProductDetailsPage'
import CartPage from './pages/Cart'
import Notfound from './pages/Notfound'

function App() {
  
  return (
    <>
  
 <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home/>} />
        <Route path="/product" element={<ProductList/>} />
        <Route path="/product-detail/:id" element={<ProductDetailsPage/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/not-found" element={<Notfound/>} />


        {/* User and Admin both protected */}
        <Route
          element={<ProtectedLayout allowedRoles={["user", "admin"]} />}
        >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Admin protected */}
        <Route element={<ProtectedLayout allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* <Route path="/add-product" element={<AddProduct />} /> */}
      </Routes>

     
    </>
  )
}

export default App
