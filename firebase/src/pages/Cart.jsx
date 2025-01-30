// import React, { useEffect } from "react";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { fetchCart, removeFromCart, updateQuantity, updateQuantityLocally } from "../features/cart/cartSlice";
// import { toast } from "react-toastify";
// import ThankYouPopup from "../components/OrderPopUp";

// // const initialProducts = [
// //   {
// //     id: 1,
// //     name: "Wireless Headphones",
// //     brand: "Sony",
// //     category: "Electronics",
// //     price: 2999,
// //     discount: 10, // in %
// //     image: "https://via.placeholder.com/100", // Fake Image
// //     quantity: 1,
// //   },
// //   {
// //     id: 2,
// //     name: "Running Shoes",
// //     brand: "Nike",
// //     category: "Sports",
// //     price: 4999,
// //     discount: 15,
// //     image: "https://via.placeholder.com/100",
// //     quantity: 1,
// //   },
// // ];



// export default function CartPage() {

//   const [showPopup, setShowPopup] = useState(false);
//   const { loading ,user } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//     const {cartItems,status} = useSelector((state) => state.cart);
//     console.log(cartItems);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // if(!loading && !user){
//     //  navigate ('/login');
//     // }  

//   },[]);

//   // if user not login then handle cart which is store in localstorage----
       
     


//   // Function to update quantity
//  const handleUpdateQuantity = async (id, type) => {
//   const item = cartItems.find((item) => item.id === id);
//   if (!item) return;

//   const newQuantity = type === "increase" ? item.quantity + 1 : item.quantity - 1;
//   if (newQuantity < 1) return; // Prevent negative quantity

//   // Store previous state in case of rollback
//   const previousQuantity = item.quantity;

//   // **1. Optimistically update UI** (directly update Redux store)
//   dispatch(updateQuantityLocally({ id, quantity: newQuantity }));

//   try {
//     // **2. Send request to backend**
//     await dispatch(updateQuantity({ userId: user.uid, id, quantity: newQuantity })).unwrap();
//   } catch (error) {
//     // **3. Rollback if API fails**
//     dispatch(updateQuantityLocally({ id, quantity: previousQuantity }));
//     toast.error("Failed to update quantity. Please try again.");
//   }
// };

// const totalDiscount = cartItems?.reduce(
//   (acc, item) =>
//     acc + item?.quantity * (item.product?.price * (item?.product?.discountPercentage / 100)),
//   0
// );



//   // Function to remove item
//   const removeItem = async(id) => {
//     console.log("Remove Item:", id);
//      const rmItem =  dispatch(removeFromCart({userId:(user.uid),id}))
//      if(rmItem) {
//        toast.success("Item removed from cart");
//      }
//   };

//   const totalAmount = cartItems?.reduce(
//     (acc, item) => acc + item.quantity * item.product?.price,
//     0
//   );  


//     if(status === "loading") {
//     return (
//       <div className="text-center py-10 animate-spin h-[20rem] w-full flex justify-center items-center">
//         <div className="w-8 h-8 border-t-3 border-blue-500 rounded-full"></div>
//       </div>
//     );
//   }

//     return (
//       <div className="bg-gray-100 min-h-screen p-6">
//         <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
//           {/* Delivery Section */}
//           <div className="mb-4 text-sm">
//             {/* <span className="text-gray-600">Deliver to:</span>{" "} */}
//             <span className="font-semibold">Your All cart Items:</span>
//             <span className="text-blue-600 cursor-pointer ml-2">Change</span>
//           </div>
  
//           {/* Cart Items */}
//           {cartItems.length > 0 ? (
//             cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex flex-col md:flex-row gap-4 border p-4 rounded-lg mb-4"
//               >
//                 {/* Product Image */}
//                 <img
//                   src={item.product?.thumbnail}
//                   alt={item.product?.title}
//                   className="w-24 h-24 object-cover rounded-lg"
//                 />
  
//                 {/* Product Details */}
//                 <div className="flex-1">
//                   <h2 className="font-semibold text-lg">
//                     {item.product?.title}
//                   </h2>
//                   <p className="text-gray-600 text-sm">
//                     Brand: {item.product?.brand}
//                   </p>
//                   <p className="text-gray-600 text-sm">
//                     Category: {item.product?.category}
//                   </p>
//                   <div className="flex items-center mt-2">
//                     <span className="text-lg font-semibold">
//                       ₹{item.product?.price}
//                     </span>
//                     <span className="text-green-600 ml-2 text-sm">
//                       {item?.product?.discountPercentage}% Off
//                     </span>
//                   </div>
  
//                   {/* Quantity Control */}
//                   <div className="mt-3 flex items-center gap-3">
//                     <button
//                       onClick={() => handleUpdateQuantity(item.id, "decrease")}
//                       className="border px-2 py-1 rounded"
//                     >
//                       -
//                     </button>
//                     <span>{item?.quantity}</span>
//                     <button
//                       onClick={() => handleUpdateQuantity(item.id, "increase")}
//                       className="border px-2 py-1 rounded"
//                     >
//                       +
//                     </button>
                    
//                     <button
//                       onClick={() => removeItem(item.id)}
//                       className="ml-4 text-sm text-red-500 hover:text-red-600"
//                     >
//                       REMOVE
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-500">Your cart is empty 😔</p>
//           )}
  
//           {/* Price Details */}
//           {cartItems.length > 0 && (
//             <div className="mt-6 p-4 border rounded-lg">
//               <h3 className="font-semibold text-lg border-b pb-2 text-blue-500">
//                 PRICE DETAILS------
//               </h3>
//               <div className="flex justify-between text-sm mt-3">
//                 <span>
//                   Price ({cartItems.length} item
//                   {cartItems.length > 1 ? "s" : ""})
//                 </span>
//                 <span>₹{Number(totalAmount).toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between text-sm mt-3">
//                 <span>Discount</span>
//                 <span className="text-green-700">
//                   -₹{Number(totalDiscount).toFixed(2)}
//                 </span>
//               </div>
//               <div className="flex justify-between font-semibold text-lg mt-3">
//                 <span>Total Amount</span>
//                 <span>₹{Number(totalAmount - totalDiscount).toFixed(2)}</span>
//               </div>
//               <p className="text-green-600 text-sm mt-1">
//                 You will save ₹{Number(totalDiscount).toFixed(2)} on this order.
//               </p>
//               <button 
//                 onClick={() => setShowPopup(true)}
//               className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:opacity-90">
//                 Place Order
//               </button>
//               <p className="text-xs text-gray-500 mt-2 flex items-center">
//                 <span className="mr-2">🔒</span> Safe and Secure Payments. Easy
//                 returns. 100% Authentic products.
//               </p>
//             </div>
//           )}
//         </div>
//         {showPopup &&
//          <ThankYouPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
//       }
//       </div>

//   );
// }


// ----------------------------------------------------------


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCart,
  removeFromCart,
  updateCartLocally,
  updateQuantity,
  updateQuantityLocally,
} from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import ThankYouPopup from "../components/OrderPopUp";

export default function CartPage() {
  const [showPopup, setShowPopup] = useState(false);
  const { loading, user } = useSelector((state) => state.auth);
  const { cartItems, status } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Load cart from localStorage if user is not logged in
  useEffect(() => {
    if (!user) {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      console.log("user not found",localCart);
// Transform data
// const formattedCart = localCart.map(({ productId, ...rest }) => ({
//   productId,
//   product: rest
// }));

// Update local storage or state
  dispatch(updateCartLocally(localCart));

    } else {
      dispatch(fetchCart(user.uid));
    }
  }, [user, dispatch]);

  // Save cart to localStorage whenever cartItems change
  useEffect(() => {
    if (!user && cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);


 


  // Update quantity function
  const handleUpdateQuantity = async (id, type) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    const newQuantity = type === "increase" ? item.quantity + 1 : item.quantity - 1;
    if (newQuantity < 1) return;

    if (user) {
      try {
        await dispatch(updateQuantity({ userId: user.uid, id, quantity: newQuantity })).unwrap();
      } catch {
        toast.error("Failed to update quantity. Please try again.");
      }
    } else {
      // Handle localStorage update
      const updatedCart = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      dispatch(updateQuantityLocally(updatedCart));
    }
  };

  // Remove item function
  const removeItem = (id) => {
    if (user) {
      dispatch(removeFromCart({ userId: user.uid, id }));
      toast.success("Item removed from cart");
    } else {
      // Remove from localStorage
      const updatedCart = cartItems.filter((item) => item.id !== id);
      // delete from local storage particular product
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      dispatch( updateCartLocally(cartItems.filter((item) => item.id !== id)))
      toast.success("Item removed from cart");
    }
  };

  const totalDiscount = cartItems.reduce(
    (acc, item) => acc + item.quantity * (item.product?.price * (item.product?.discountPercentage / 100)),
    0
  );

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.product?.price,
    0
  );

  if (status === "loading") {
    return (
      <div className="text-center py-10 flex justify-center items-center">
        <div className="w-8 h-8 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="font-semibold">Your Cart Items:</h2>

        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row gap-4 border p-4 rounded-lg mb-4">
              <img src={item.product?.thumbnail} alt={item.product?.title} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{item.product?.title}</h2>
                <p className="text-gray-600 text-sm">Brand: {item.product?.brand}</p>
                <p className="text-gray-600 text-sm">Category: {item.product?.category}</p>
                <div className="flex items-center mt-2">
                  <span className="text-lg font-semibold">₹{item.product?.price}</span>
                  <span className="text-green-600 ml-2 text-sm">{item.product?.discountPercentage}% Off</span>
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <button onClick={() => handleUpdateQuantity(item.id, "decrease")} className="border px-2 py-1 rounded">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleUpdateQuantity(item.id, "increase")} className="border px-2 py-1 rounded">+</button>
                  <button onClick={() => removeItem(item.id)} className="ml-4 text-sm text-red-500 hover:text-red-600">REMOVE</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty 😔</p>
        )}

        {cartItems.length > 0 && (
          <div className="mt-6 p-4 border rounded-lg">
            <h3 className="font-semibold text-lg border-b pb-2 text-blue-500">PRICE DETAILS</h3>
            <div className="flex justify-between text-sm mt-3">
              <span>Price ({cartItems.length} item{cartItems.length > 1 ? "s" : ""})</span>
              <span>₹{Number(totalAmount).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mt-3">
              <span>Discount</span>
              <span className="text-green-700">-₹{Number(totalDiscount).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-3">
              <span>Total Amount</span>
              <span>₹{Number(totalAmount - totalDiscount).toFixed(2)}</span>
            </div>
            <p className="text-green-600 text-sm mt-1">
              You will save ₹{Number(totalDiscount).toFixed(2)} on this order.
            </p>
            <button onClick={() => setShowPopup(true)} className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:opacity-90">
              Place Order
            </button>
            <p className="text-xs text-gray-500 mt-2 flex items-center">
              <span className="mr-2">🔒</span> Safe and Secure Payments. Easy returns. 100% Authentic products.
            </p>
          </div>
        )}
      </div>
      {showPopup && <ThankYouPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />}
    </div>
  );
}
