import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import uuidv4  from "uuid4";

const CheckoutPage = () => {
    const {user} = useSelector((state) => state.auth);
    const [shippingCost,setShippingCost] = useState(() => Math.floor(Math.random() * (100 - 30 + 1)) + 30);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: user.email,
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const{cartItems} = useSelector((state) => state.cart);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
   const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!razorpayLoaded) {
      console.error("Razorpay SDK not loaded");
      return;
    }

      // Check if any required field is empty or not-------
  const requiredFields = ["firstName", "lastName", "phone", "address", "city", "zipCode", "country"];
  const emptyFields = requiredFields.filter((field) => !formData[field].trim());

  if (emptyFields.length > 0) {
    toast("Please fill in all required fields before placing an order.");
    return;
  }

    const options = {
      key: "rzp_test_ZRDHYhXHNJgxEi", // Replace with your Razorpay key
      Key_secret: "9u2a9A6UohgMIrkSRfht7KsN",
      amount: (Number(totalPrice) + Number(shippingCost)) * 100, // in paisa
      currency: "INR",
      name: formData.firstName + " " + formData.lastName,
      description: "Order Payment",
      prefill: {
        name: formData.firstName + " " + formData.lastName,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#3399cc",
      },
      handler: async (response) => {
        toast("Payment successful! Payment ID: " + response.razorpay_payment_id);

        // Store order details in Firebase
        try {
          console.log("cartItems-order",cartItems)
         const orderData =  {
            userId: user.uid,
            ...formData,
            products: cartItems.map((item) => ({
              productId: item.id,
              quantity: item.quantity, 
            
              discountPercentage: item.product ? item.product.discountPercentage : 0,
            })), 
            totalPrice,
            shippingCost,
            OrderStatus: "processing", // pending, processing, shipped, delivered,cancelled
            grandTotal: Number(totalPrice) + Number(shippingCost),
            paymentId: response.razorpay_payment_id,
            createdAt: new Date(),
          }
          const orderId = uuidv4();
          await setDoc(doc(db, "orders",   orderId), orderData);
          toast("Order placed successfully!");
          navigate(`/order-confirmation/${orderId}`);
        } catch (error) {
          console.error("Error saving order:", error?.message);
        }
      },
      modal: {
        ondismiss: function () {
          alert("Payment was cancelled.");
        },
      },
    
    };

    try {
      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.success", function (response) {
        toast("Payment successful! Payment ID: " + response.razorpay_payment_id);
         // save in local storage
        // localStorage.setItem("response.razorpay_payment_id", JSON.stringify(response.razorpay_payment_id));
        console.log("response.razorpay_payment_id",response.razorpay_payment_id)
      });

      razorpay.on("payment.failed", function (response) {
        alert("Payment failed! Error: " + response.error.description);
      });

      razorpay.open();
    } catch (error) {
      console.error("Error initializing Razorpay:", error);
    }
  };
 

  const calculateTotal = () => {
    if (!cartItems || cartItems.length === 0) return { totalPrice: 0, discountedPrice: 0 };
  
    let total = 0;
    cartItems.forEach((item) => {
      const price = parseFloat(item.product.price) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;
      const discount = parseFloat(item.product.discountPercentage) / 100 || 0;
  
      const itemTotal = price * quantity;
      const discountedItemTotal = itemTotal - itemTotal * discount;
  
      total += discountedItemTotal;
    });
  
    return { totalPrice: total.toFixed(2) };
  };
  
  const { totalPrice } = calculateTotal();
  



  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="w-full mx-auto p-6">
        <div className="bg-white shadow-md rounded p-6">
          <form onSubmit={handleSubmit} className="space-y-6 flex justify-between gap-2">
            <div className="w-1/2">
              <h1 className="text-xl font-bold text-blue-500">Checkout</h1>
              <p className="text-gray-600">Complete your order by providing your details below.</p>
              <p className="text-lg font-semibold py-4">Personal Information:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  readOnly
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded hover:cursor-not-allowed text-gray-500 focus:cursor-not-allowed"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
           <p className="text-lg font-semibold py-4">Shiping Address:</p>
              <div>
                <label className="block text-sm font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Country</option>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
            </div>

            <div className="w-1/3 border-[1px] border-gray-400 h-auto p-6">
              <div>
                <h2 className="text-lg font-semibold text-green-500 ">Order Summary</h2>
                <div className="flex justify-between py-4 gap-y-3 flex-col">
                <p className="flex justify-between items-center">Subtotal: <strong>₹{totalPrice}</strong></p>
                <p className="flex justify-between items-center">Shipping: <strong>₹{shippingCost}</strong></p>
                <p className="flex justify-between items-center">Total: <strong>₹{Number(totalPrice)+Number(shippingCost)}</strong></p>
                </div>
              </div>

              <button type="submit" className="w-full text-white cursor-pointer p-3 bg-green-600 rounded hover:bg-green-500">
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
