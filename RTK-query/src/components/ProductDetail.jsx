import React from "react";
import { useGetProductByIdQuery } from "../features/products/ProductAPI";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/CartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetProductByIdQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading product details</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }
  const dispatch = useDispatch()

  const handleAddToCart = () => {
  console.log('add to cart');
  dispatch(addToCart(product))
  }


  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    category,
    brand,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    images,
  } = product;

  return (
    <div className="bg-gray-100 text-black min-h-screen py-8 px-4 md:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="relative">
          <img
            src={images[0]}  // Assuming images is an array
            alt={title}
            className="w-full max-w-xl rounded-2xl shadow-lg border-[1px] border-gray-200 h-2xl object-cover"
          />
          <div className="flex space-x-4 mt-4 overflow-x-auto">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col justify-start space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-gray-800 text-sm uppercase mb-2">{category}</p>
            <p className="text-lg font-medium text-black mb-2">{description}</p>
          </div>

          {/* Pricing */}
          <div className="mb-3">
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold">${price.toFixed(2)}</span>
              <span className="text-lg text-green-500 font-semibold">
                -{discountPercentage * 100}% {/* Correcting the discount percentage */}
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-1">Rated: {rating} / 5</p>
          </div>

          {/* Additional Details */}
          <div className="space-y-4">
            <p className="flex items-center gap-2">
              <span className="font-bold">Brand:</span> {brand}
            </p>
            <p className="flex items-center gap-2">
              <span className="font-bold">Warranty:</span> {warrantyInformation}
            </p>
            <p className="flex items-center gap-2">
              <span className="font-bold">Shipping:</span> {shippingInformation}
            </p>
            <p className="flex items-center gap-2">
              <span
                className={`font-bold ${
                  availabilityStatus === "In Stock"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {availabilityStatus}
              </span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-6">
            <button onClick={handleAddToCart} className="bg-blue-600 text-white  hover:bg-blue-500 px-6 py-3 rounded-lg text-base font-bold">
              Add to Cart
            </button>
            <button className="bg-gray-300 text-base hover:bg-gray-400 px-6 py-3 rounded-lg text-black font-bold">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
