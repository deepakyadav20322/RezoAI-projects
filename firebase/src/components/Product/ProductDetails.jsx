import React from "react";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const ProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      // Mock API call; replace with actual fetch logic
      const fetchedProduct = {
        id: "0kqCfWEA31er7TcjGP9A",
        title: "Frontend Developer Developer 6",
        brand: "Appless",
        category: "Sports",
        description: "Hello man",
        price: "9",
        discountPercentage: "8",
        rating: "2",
        stock: "12",
        thumbnail: ""
      };
      setProduct(fetchedProduct);
    }
    fetchProduct();
  }, [productId]);

  if (!product) return <div className="text-center py-10">Loading...</div>;

  const discountedPrice = (
    parseFloat(product.price) * (1 - parseFloat(product.discountPercentage) / 100)
  ).toFixed(2);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
            {product.thumbnail ? (
              <img src={product.thumbnail} alt={product.title} className="w-[20rem] h-[20rem] object-cover" />
            ) : (
              <div className="text-gray-500">No image available</div>
            )}
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-sm text-gray-500 mt-1">Brand: {product.brand}</p>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">{product.category}</span>
          <div className="flex items-center space-x-2">
            <div className="flex mt-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`w-5 h-5 ${i < parseInt(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.rating} out of 5)</span>
          </div>
          <div className="text-2xl font-bold">
            ${discountedPrice}
            {product.discountPercentage !== "0" && (
              <span className="ml-2 text-sm text-gray-500 line-through">${product.price}</span>
            )}
          </div>
          {product.discountPercentage !== "0" && (
            <p className="text-green-600">Save {product.discountPercentage}%</p>
          )}
          <p className="text-gray-700">{product.description}</p>
          <p className="text-sm text-gray-500">In stock: {product.stock}</p>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
