import React, { useState } from "react";
import { FaStar, FaShoppingBag } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, fetchCart } from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProductCard({
  id,
  title,
  description,
  price,
  discountPercentage,
  rating,
  stock,
  brand,
  category,
  thumbnail,
}) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isLoggedIn = useSelector((state) => state.auth.user);
  const [localCart, setLocalCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const discountedPrice = discountPercentage
    ? price - price * (discountPercentage / 100)
    : price;
  const isInCart = cartItems?.some((item) => item.id === id);
  const IslocalCart = localCart?.some((item) => item.id === id);
  console.log(isInCart);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      // store in local storage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      // cart.push();
      cart.push({
        productId: id,
        id,
        product: {
          id,
          title,
          description,
          price,
          discountPercentage,
          rating,
          stock,
          brand,
          category,
          thumbnail,
        },
        quantity: 1,
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      setLocalCart(cart);
      toast.success("Item added to cart");
    } else {
      let productId = id;
      dispatch(addToCart({ userId: isLoggedIn.uid, productId, quantity: 1 }))
        .unwrap() // Using unwrap to handle resolved or rejected actions
        .then(() => {
          toast.success("Item added to cart");

          dispatch(fetchCart(isLoggedIn.uid));
        })
        .catch((error) => {
          // Show error if rejected
          toast.error(`Error adding item to cart: ${error.message}`);
        });
    }
  };

  return (
    <div className="w-full max-w-[20rem] overflow-hidden border rounded-lg shadow-lg">
      {/* Product Image */}
      <Link
        to={`/product-detail/${id}`}
        className="relative flex justify-centers "
      >
        <img
          // src={thumbnail || "https://via.placeholder.com/150"}
          src={thumbnail || "https://via.placeholder.com/150"}
          alt={title}
          className="transition-transform duration-300 ease-in-out hover:scale-105 object-cover h-42 w-full bg-slate-200 rounded-2xl m-1"
        />
        {discountPercentage && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discountPercentage}% OFF
          </div>
        )}
      </Link>

      {/* Product Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold line-clamp-1">{title}</h2>
        <p className="text-sm text-gray-500 mb-2">{brand}</p>

        {/* Rating */}
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`w-4 h-4 ${
                i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">({rating})</span>
        </div>
        <p className="text-slate-400">description:-</p>

        {/* Show some content and then ... */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
          {description}
           
        </p>

        {/* Price & Category */}
        <div className="flex items-center justify-between">
          <div>
            {discountPercentage ? (
              <div className="flex items-center">
                <span className="text-lg font-bold text-green-600">
                  ₹{discountedPrice}
                </span>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ₹{price}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold">₹{price}</span>
            )}
          </div>
          <div className="px-2 py-1 text-xs font-semibold text-white bg-gray-600 rounded">
            {category}
          </div>
        </div>
      </div>

      {/* Stock & Add to Cart Button */}
      <div className="p-2 flex items-center justify-between">
        <span className={`text-sm text-gray-500 border-[1px] border-black p-2 rounded-xl ${stock < 1 ? "text-red-500" : "text-green-700"}`}>
          {stock > 0 ? `${stock} in stock` : "Out of stock"}
        </span>
        {isInCart || IslocalCart ? (
          <Link
            to="/cart?get=true"
            className="w-1/2 flex items-center justify-center px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
          >
            Go to Cart
          </Link>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={stock < 1}
            className="w-1/2 flex items-center justify-center px-2 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed "
          >
            <FaShoppingBag className=" h-4 w-4 mr-1" /> Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
