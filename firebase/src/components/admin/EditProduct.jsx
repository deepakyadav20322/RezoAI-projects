import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"; 
import { updateProduct } from "../../features/Product/ProductSlice";
import { db } from "../../firebase"; // Assuming you have a Firebase configuration file
import { doc, getDoc } from "firebase/firestore"; 
import { toast } from "react-toastify";

export default function EditProduct() {
  const { productId } = useParams();  // Retrieve product ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch the existing product details from the Redux store (or from an API)
  const product = useSelector((state) =>
    Array.isArray(state.products) ? state.products.find((product) => product.id === productId) : null
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
    thumbnail: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", productId);  // Firestore collection path
        const productDoc = await getDoc(productRef);

        if (productDoc.exists()) {
          const fetchedProduct = productDoc.data();
          setFormData({
            title: fetchedProduct.title,
            description: fetchedProduct.description,
            price: fetchedProduct.price,
            discountPercentage: fetchedProduct.discountPercentage,
            rating: fetchedProduct.rating,
            stock: fetchedProduct.stock,
            brand: fetchedProduct.brand,
            category: fetchedProduct.category,
            thumbnail: fetchedProduct.thumbnail,
          });
        } else {
          console.log("Product not found in Firestore");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (!product) {
      fetchProduct();  // Fetch product from Firestore if not in Redux store
      console.log('fetch call')
    } else {
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock,
        brand: product.brand,
        category: product.category,
        thumbnail: product.thumbnail,
      });
    }
  }, [product, productId]);  // Re-run when productId or product changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the updateProduct action with the updated data
    dispatch(updateProduct({ productId, updatedData: formData }));

    console.log("Updated Product:", formData);
    toast("Product Updated Successfully!");
    navigate("/admin/dashboard/products");  // Navigate back to product list (adjust the path as needed)
  };

  if (!product && !formData.title) {
    return <p>Loading...</p>; // Or display a loading spinner
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-10 w-full">
      <h2 className="text-2xl font-bold mb-5 text-center">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium">Product Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
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
            value={formData.description}
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
              value={formData.price}
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
              value={formData.discountPercentage}
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
              value={formData.category}
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
              value={formData.stock}
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
              value={formData.brand}
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
              value={formData.rating}
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
            value={formData.thumbnail}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter image URL"
          />
          {/* Display product thumbnail */}
          {formData.thumbnail && (
            <img
              src={formData.thumbnail}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
