// import { addDoc, collection, doc, setDoc } from "firebase/firestore";
// import React, { useState, useEffect, useMemo } from "react";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { db } from "../firebase";
// import { useNavigate } from "react-router-dom";
// import uuidv4  from "uuid4";

// const CheckoutPage = () => {
//     const {user} = useSelector((state) => state.auth);
//     const [shippingCost,setShippingCost] = useState(() => Math.floor(Math.random() * (100 - 30 + 1)) + 30);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: user.email,
//     phone: "",
//     address: "",
//     city: "",
//     zipCode: "",
//     country: "",
//     cardName: "",
//     cardNumber: "",
//     expiryDate: "",
//     cvv: "",
//   });
//   const{cartItems} = useSelector((state) => state.cart);
//   const [razorpayLoaded, setRazorpayLoaded] = useState(false);
//    const navigate = useNavigate();

//   // Dynamically load Razorpay script
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => setRazorpayLoaded(true);
//     script.onerror = () => console.error("Failed to load Razorpay script.");
//     document.body.appendChild(script);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!razorpayLoaded) {
//       console.error("Razorpay SDK not loaded");
//       return;
//     }

//       // Check if any required field is empty or not-------
//   const requiredFields = ["firstName", "lastName", "phone", "address", "city", "zipCode", "country"];
//   const emptyFields = requiredFields.filter((field) => !formData[field].trim());

//   if (emptyFields.length > 0) {
//     toast("Please fill in all required fields before placing an order.");
//     return;
//   }

//     const options = {
//       key: "rzp_test_ZRDHYhXHNJgxEi", // Replace with your Razorpay key
//       Key_secret: "9u2a9A6UohgMIrkSRfht7KsN",
//       amount: (Number(totalPrice) + Number(shippingCost)) * 100, // in paisa
//       currency: "INR",
//       name: formData.firstName + " " + formData.lastName,
//       description: "Order Payment",
//       prefill: {
//         name: formData.firstName + " " + formData.lastName,
//         email: formData.email,
//         contact: formData.phone,
//       },
//       theme: {
//         color: "#3399cc",
//       },
//       handler: async (response) => {
//         toast("Payment successful! Payment ID: " + response.razorpay_payment_id);

//         // Store order details in Firebase
//         try {
//           console.log("cartItems-order",cartItems)
//          const orderData =  {
//             userId: user.uid,
//             ...formData,
//             products: cartItems.map((item) => ({
//               productId: item.id,
//               quantity: item.quantity,

//               discountPercentage: item.product ? item.product.discountPercentage : 0,
//             })),
//             totalPrice,
//             shippingCost,
//             OrderStatus: "processing", // pending, processing, shipped, delivered,cancelled
//             grandTotal: Number(totalPrice) + Number(shippingCost),
//             paymentId: response.razorpay_payment_id,
//             createdAt: new Date(),
//           }
//           const orderId = uuidv4();
//           await setDoc(doc(db, "orders",   orderId), orderData);
//           toast("Order placed successfully!");
//           navigate(`/order-confirmation/${orderId}`);
//         } catch (error) {
//           console.error("Error saving order:", error?.message);
//         }
//       },
//       modal: {
//         ondismiss: function () {
//           alert("Payment was cancelled.");
//         },
//       },

//     };

//     try {
//       const razorpay = new window.Razorpay(options);

//       razorpay.on("payment.success", function (response) {
//         toast("Payment successful! Payment ID: " + response.razorpay_payment_id);
//          // save in local storage
//         // localStorage.setItem("response.razorpay_payment_id", JSON.stringify(response.razorpay_payment_id));
//         console.log("response.razorpay_payment_id",response.razorpay_payment_id)
//       });

//       razorpay.on("payment.failed", function (response) {
//         alert("Payment failed! Error: " + response.error.description);
//       });

//       razorpay.open();
//     } catch (error) {
//       console.error("Error initializing Razorpay:", error);
//     }
//   };

//   const calculateTotal = () => {
//     if (!cartItems || cartItems.length === 0) return { totalPrice: 0, discountedPrice: 0 };

//     let total = 0;
//     cartItems.forEach((item) => {
//       const price = parseFloat(item.product.price) || 0;
//       const quantity = parseInt(item.quantity, 10) || 0;
//       const discount = parseFloat(item.product.discountPercentage) / 100 || 0;

//       const itemTotal = price * quantity;
//       const discountedItemTotal = itemTotal - itemTotal * discount;

//       total += discountedItemTotal;
//     });

//     return { totalPrice: total.toFixed(2) };
//   };

//   const { totalPrice } = calculateTotal();

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <div className="w-full mx-auto p-6">
//         <div className="bg-white shadow-md rounded p-6">
//           <form onSubmit={handleSubmit} className="space-y-6 flex justify-between gap-2">
//             <div className="w-1/2">
//               <h1 className="text-xl font-bold text-blue-500">Checkout</h1>
//               <p className="text-gray-600">Complete your order by providing your details below.</p>
//               <p className="text-lg font-semibold py-4">Personal Information:</p>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium">First Name</label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium">Last Name</label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   readOnly
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded hover:cursor-not-allowed text-gray-500 focus:cursor-not-allowed"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium">Phone</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                   required
//                 />
//               </div>
//            <p className="text-lg font-semibold py-4">Shiping Address:</p>
//               <div>
//                 <label className="block text-sm font-medium">Address</label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium">City</label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium">ZIP Code</label>
//                   <input
//                     type="text"
//                     name="zipCode"
//                     value={formData.zipCode}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium">Country</label>
//                 <select
//                   name="country"
//                   value={formData.country}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                   required
//                 >
//                   <option value="">Select Country</option>
//                   <option value="India">India</option>
//                   <option value="United States">United States</option>
//                   <option value="Canada">Canada</option>
//                 </select>
//               </div>
//             </div>

//             <div className="w-1/3 border-[1px] border-gray-400 h-auto p-6">
//               <div>
//                 <h2 className="text-lg font-semibold text-green-500 ">Order Summary</h2>
//                 <div className="flex justify-between py-4 gap-y-3 flex-col">
//                 <p className="flex justify-between items-center">Subtotal: <strong>₹{totalPrice}</strong></p>
//                 <p className="flex justify-between items-center">Shipping: <strong>₹{shippingCost}</strong></p>
//                 <p className="flex justify-between items-center">Total: <strong>₹{Number(totalPrice)+Number(shippingCost)}</strong></p>
//                 </div>
//               </div>

//               <button type="submit" className="w-full text-white cursor-pointer p-3 bg-green-600 rounded hover:bg-green-500">
//                 Place Order
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;
// -------------------------------------------------------------------------------------------->

// import { addDoc, collection, doc, runTransaction } from "firebase/firestore";
// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { db } from "../firebase";
// import { useNavigate } from "react-router-dom";
// import uuidv4 from "uuid4";

// const CheckoutPage = () => {
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.cart);
//   const navigate = useNavigate();
//   const [shippingCost, setShippingCost] = useState(() => Math.floor(Math.random() * (100 - 30 + 1)) + 30);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: user?.email || "",
//     phone: "",
//     address: "",
//     city: "",
//     zipCode: "",
//     country: "",
//   });
//   const [razorpayLoaded, setRazorpayLoaded] = useState(false);

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => setRazorpayLoaded(true);
//     document.body.appendChild(script);
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((acc, item) => {
//       const price = parseFloat(item.product.price) || 0;
//       const quantity = parseInt(item.quantity, 10) || 0;
//       const discount = parseFloat(item.product.discountPercentage) / 100 || 0;
//       return acc + (price * quantity - price * quantity * discount);
//     }, 0).toFixed(2);
//   };
//   const totalPrice = calculateTotal();

//   const handlePayment = async () => {
//     if (!razorpayLoaded) {
//       toast.error("Payment gateway not loaded yet!");
//       return;
//     }

//     const orderId = uuidv4();
//     const options = {
//       key: "rzp_test_ZRDHYhXHNJgxEi", // Public Razorpay Key
//       amount: (Number(totalPrice) + Number(shippingCost)) * 100,
//       currency: "INR",
//       name: `${formData.firstName} ${formData.lastName}`,
//       description: "Order Payment",
//       prefill: {
//         name: `${formData.firstName} ${formData.lastName}`,
//         email: formData.email,
//         contact: formData.phone,
//       },
//       theme: { color: "#3399cc" },
//       handler: async (response) => {
//         try {
//           await runTransaction(db, async (transaction) => {
//             const orderRef = doc(db, "orders", orderId);
//             transaction.set(orderRef, {
//               userId: user.uid,
//               ...formData,
//               products: cartItems.map((item) => ({
//                 productId: item.id,
//                 quantity: item.quantity,
//               })),
//               totalPrice,
//               shippingCost,
//               grandTotal: Number(totalPrice) + Number(shippingCost),
//               paymentId: response.razorpay_payment_id,
//               OrderStatus: "processing",
//               createdAt: new Date(),
//             });
//           });
//           toast.success("Order placed successfully!");
//           navigate(`/order-confirmation/${orderId}`);
//         } catch (error) {
//           toast.error("Error processing order");
//           console.error("Transaction failed", error);
//         }
//       },
//       modal: {
//         ondismiss: function () {
//           toast.info("Payment was cancelled");
//         },
//       },
//     };

//     const razorpay = new window.Razorpay(options);
//     razorpay.open();
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <div className="w-full mx-auto p-6 bg-white shadow-md rounded">
//         <h1 className="text-xl font-bold text-blue-500">Checkout</h1>
//         <form className="space-y-6 flex justify-between gap-2">
//           <div className="w-1/2">
//             <p className="text-lg font-semibold py-4">Personal Information:</p>
//             <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="w-full p-2 border rounded" required />
//             <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="w-full p-2 border rounded" required />
//             <input type="email" name="email" value={formData.email} readOnly className="w-full p-2 border rounded bg-gray-200" />
//             <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 border rounded" required />
//             <p className="text-lg font-semibold py-4">Shipping Address:</p>
//             <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full p-2 border rounded" required />
//             <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full p-2 border rounded" required />
//             <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="ZIP Code" className="w-full p-2 border rounded" required />
//             <select name="country" value={formData.country} onChange={handleChange} className="w-full p-2 border rounded" required>
//               <option value="">Select Country</option>
//               <option value="India">India</option>
//               <option value="United States">United States</option>
//               <option value="Canada">Canada</option>
//             </select>
//           </div>
//           <div className="w-1/3 border p-6">
//             <h2 className="text-lg font-semibold text-green-500">Order Summary</h2>
//             <p>Subtotal: ₹{totalPrice}</p>
//             <p>Shipping: ₹{shippingCost}</p>
//             <p>Total: ₹{Number(totalPrice) + Number(shippingCost)}</p>
//             <button type="button" onClick={handlePayment} className="w-full p-3 bg-green-600 text-white rounded hover:bg-green-500">
//               Place Order
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

// -------------------------------------------------------------------------

import { doc, runTransaction } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import uuidv4 from "uuid4";
import { FaCreditCard, FaTruck, FaShieldAlt } from 'react-icons/fa';


const CheckoutPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [shippingCost] = useState(
    () => Math.floor(Math.random() * (100 - 30 + 1)) + 30
  );
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: user.email,
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });

  // Dynamically load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => console.error("Failed to load Razorpay script.");
    document.body.appendChild(script);

    
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Calculate total price
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      const price = parseFloat(item.product.price) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;
      const discount = parseFloat(item.product.discountPercentage) / 100 || 0;
      total += price * quantity * (1 - discount);
    });
    return { totalPrice: total.toFixed(2) };
  };
  
  const { totalPrice } = calculateTotal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!razorpayLoaded) {
      toast("Payment system not ready. Please try again.");
      return;
    }

    const requiredFields = [
      "firstName",
      "lastName",
      "phone",
      "address",
      "city",
      "zipCode",
      "country",
    ];
    if (requiredFields.some((field) => !formData[field].trim())) {
      toast("Please fill in all required fields before placing an order.");
      return;
    }

    setLoading(true);

    const options = {
      key: "rzp_test_ZRDHYhXHNJgxEi",
      amount: (Number(totalPrice) + Number(shippingCost)) * 100,
      currency: "INR",
      name: `${formData.firstName} ${formData.lastName}`,
      description: "Order Payment",
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone,
      },
      theme: { color: "#3399cc" },
      handler: async (response) => {
        // toast("Payment successful! Payment ID: " + response.razorpay_payment_id);
        console.log("response->payment successfull", response);

        try {
          const orderId = uuidv4();

          const orderData = {
            userId: user.uid,
            ...formData,
            products: cartItems.map((item) => ({
              productId: item.id,
              quantity: item.quantity,
              discountPercentage: item.product?.discountPercentage || 0,
            })),
            totalPrice,
            shippingCost,
            OrderStatus: "processing",
            grandTotal: Number(totalPrice) + Number(shippingCost),
            paymentId: response.razorpay_payment_id,
            createdAt: new Date(),
          };

          // Run Firestore Transaction
          await runTransaction(db, async (transaction) => {
            // Step 1: Read all product stocks
            const productStockUpdates = {};

            for (const item of cartItems) {
              const productRef = doc(db, "products", item.id);
              const productSnap = await transaction.get(productRef);

              if (!productSnap.exists()) {
                throw new Error(`Product ${item.id} not found.`);
              }

              const currentStock = productSnap.data().stock || 0;

              if (currentStock < item.quantity) {
                throw new Error(`Product ${item.id} is out of stock.`);
              }

              // Store the updated stock amount
              productStockUpdates[item.id] = currentStock - item.quantity;
            }

            // Step 2: Write all updates (only if all reads were successful)
            const orderRef = doc(db, "orders", orderId);
            transaction.set(orderRef, orderData);

            Object.entries(productStockUpdates).forEach(
              ([productId, newStock]) => {
                const productRef = doc(db, "products", productId);
                transaction.update(productRef, { stock: newStock });
              }
            );
          });

          toast("Order placed successfully!");
          setLoading(false);
          navigate(`/order-confirmation/${orderId}`);
        } catch (error) {
          console.error("Error processing order:", error?.message);
          toast(error?.message || "Order failed. Please try again.");
          setLoading(false);
        }
      },
      modal: {
        ondismiss: function () {
          alert("Payment was cancelled.");
          setLoading(false);
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-5xl mx-auto">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      )}

      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="px-6 py-2 bg-gradient-to-r from-green-100 to-green-200 ">
          <h1 className="text-2xl font-extrabold text-green-400 ">Secure Checkout</h1>
          <p className="mt-2 text-blue-600">Complete your purchase securely and quickly.</p>
        </div>

        <div className="p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  required
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  required
                />
              </div>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                required
              >
                <option value="">Select Country</option>
                <option value="India">India</option>
              </select>
              <button
                type="submit"
                className="w-full mt-6 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-green-600 hover:to-green-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-lg transform hover:-translate-y-0.5"
              >
                Place Order
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-3 text-gray-700">
                <p className="flex justify-between">
                  <span>Subtotal:</span> <span>₹{totalPrice}</span>
                </p>
                <p className="flex justify-between">
                  <span>Shipping:</span> <span>₹{shippingCost}</span>
                </p>
                <div className="border-t border-gray-300 my-4"></div>
                <p className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total:</span> <span>₹{Number(totalPrice) + Number(shippingCost)}</span>
                </p>
              </div>
          
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <FaCreditCard className="w-6 h-6 text-blue-500" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <FaTruck className="w-6 h-6 text-blue-500" />
                <span>Fast Shipping</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <FaShieldAlt className="w-6 h-6 text-blue-500" />
                <span>Buyer Protection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CheckoutPage;
