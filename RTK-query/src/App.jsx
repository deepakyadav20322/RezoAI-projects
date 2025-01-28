import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Cart from './components/Cart'
import ProductDetailsPage from './pages/ProductDetailsPage'
import AddProduct from './components/AddProducts'

function App() {


  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-4">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/product-details/:id" element={<ProductDetailsPage />} />
          <Route path="/addproduct" element={<AddProduct />} />
    </Routes>
      </div>
    </>
  )
}

export default App
