    import React from "react"
import { useState } from "react"
import { addProduct } from "../../features/Product/ProductSlice"
import { useDispatch, useSelector } from "react-redux"

export default function AddProductPage() {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
    thumbnail: "",
  })



  const fakeProducts = {
    title: "Smartphone XYZ",
    description: "A high-quality smartphone with 5G connectivity, excellent camera, and a long-lasting battery.",
    price: 499.99,
    discountPercentage: 15,
    rating: 4.5,
    stock: 150,
    brand: "TechBrand",
    category: "Electronics",
    thumbnail: "https://example.com/images/smartphone-xyz.jpg",
  };

  const dispatch = useDispatch()
 const {user,loading} = useSelector((state) => state.auth); 
  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  

  const handleSubmit = (e) => {
    e.preventDefault()
       // Dispatch the addProduct action with the necessary data
       dispatch(addProduct({ adminId: user.uid, product }));

       console.log("Product Submitted:", product);
       alert("Product Added Successfully!");
    setProduct({
      title: "",
      description: "",
      price: "",
      discountPercentage: "",
      rating: "",
      stock: "",
      brand: "",
      category: "",
      thumbnail: "",
    })
  }

  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-10">
      <h2 className="text-2xl font-bold mb-5 text-center">Add a New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium">Product Title</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter product title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border rounded"
            placeholder="Enter product description"
          />
        </div>

        {/* Price & Discount */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium">Price ($)</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="Enter price"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium">Discount (%)</label>
            <input
              type="number"
              name="discountPercentage"
              value={product.discountPercentage}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Optional"
            />
          </div>
        </div>

        {/* Category & Stock */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium">Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded bg-white"
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Home">Home</option>
              <option value="Sports">Sports</option>
              <option value="Books">Books</option>
            </select>
          </div>

          <div className="w-1/2">
            <label className="block text-gray-700 font-medium">Stock</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="Enter stock quantity"
            />
          </div>
        </div>

        {/* Brand & Rating */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium">Brand</label>
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="Enter brand name"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-gray-700 font-medium">Rating (1-5)</label>
            <input
              type="number"
              name="rating"
              value={product.rating}
              onChange={handleChange}
              min="1"
              max="5"
              required
              className="w-full p-2 border rounded"
              placeholder="Enter rating"
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-gray-700 font-medium">Thumbnail URL</label>
          <input
            type="text"
            name="thumbnail"
            value={product.thumbnail}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter image URL"
          />
          {/* {product.thumbnail && <img src={product.thumbnail} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />} */}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Add Product
        </button>
      </form>
    </div>
  )
}


