import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { fetchProductById } from "../../features/Product/ProductSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { addToCart, fetchCart } from "../../features/cart/cartSlice";
import ProductDetailSkeleton from "./LoaderProductDetails";

const ProductDetails = ({}) => {
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { productId: paramProductId } = useParams(); // Get productId from URL
  const isLoggedIn = useSelector((state) => state.auth.user);
  const productId = paramProductId;
  const [localCart, setLocalCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const IslocalCart = localCart?.some((item) => item.id === product?.id);

  const isInCart = cartItems?.some((item) => item.id === product?.id);
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const productData = await dispatch(
          fetchProductById(productId)
        ).unwrap();
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId, dispatch]);



  const handleAddToCart = () => {
    if (!isLoggedIn) {
      // store in local storage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      // cart.push();
      cart.push({
        productId: product.id,
        id: productId,
        product: {
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          discountPercentage: product.discountPercentage,
          rating: product.rating,
          stock: product.stock,
          brand: product.brand,
          category: product.category,
          thumbnail: product.thumbnail,
        },
        quantity: 1,
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      setLocalCart(cart);
      toast.success("Item added to cart");
    } else {
      // let productId = id;
      dispatch(addToCart({ userId: isLoggedIn.uid, productId, quantity: 1 }))
        .unwrap()
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

  const discountedPrice = (
    parseFloat(product?.price) *
    (1 - parseFloat(product?.discountPercentage) / 100)
  ).toFixed(2);



  if (!product) return <ProductDetailSkeleton />;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
            {product?.thumbnail ? (
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-[20rem] h-[20rem] object-cover"
              />
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
          <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
            {product.category}
          </span>
          <div className="flex items-center space-x-2">
            <div className="flex mt-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`w-5 h-5 ${
                    i < parseInt(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({product.rating} out of 5)
            </span>
          </div>
          <div className="text-2xl font-bold">
            ${discountedPrice}
            {product.discountPercentage !== "0" && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${product?.price}
              </span>
            )}
          </div>
          {product.discountPercentage !== "0" && (
            <p className="text-green-600">Save {product.discountPercentage}%</p>
          )}
          <p className="text-gray-700">{product.description}</p>
          <div className="flex items-center gap-2">
           {product.stock>0 && <p className="text-sm text-gray-500">In stock: {product.stock}</p>}
            {product.stock == 0 && (
              <span className="px-2 py-1 bg-red-100 text-red-600 text-sm rounded-full">
                Out of Stock
              </span>
            )}
          </div>
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
              className="w-1/2 flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={product.stock === 0 || product.stock < 1}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
