import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCart } from "../features/cart/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading,user, error } = useSelector((state) => state.auth);

  // const handleSubmit = async(e) => {
  //   e.preventDefault();
  //   dispatch(loginUser({ email, password })).then((result) => {
  //   if (result.meta.requestStatus === "fulfilled") {
    
  //     const user = result.payload; 

  //     if (user?.uid) {
  //     // yaha par local cart ko upload kar rahe hai after login
  //     const localCart = JSON.parse(localStorage.getItem("cart")) || [];
  //     // upload the local cart to the server
  //     if (localCart.length > 0) {
  //       try {
  //         await Promise.all(
  //           localCart.map((item) =>
  //             dispatch(
  //               addToCart({
  //                 userId: user.uid,
  //                 productId: item.id,
  //                 quantity: item.quantity,
  //               })
  //             )
  //           )
  //         );
  //         console.log("All items added successfully.");
  //         navigate("/login"); // Navigate after successful completion
  //       } catch (error) {
  //         console.error("Error adding items to cart:", error);
  //       }
  //     } else {
  //       console.error("User UID is not available.");
  //     }
  //     // end of local cart uploa
  //   }
  // } else {
  //   console.error("User not found.");
  // }

  // });

  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
    console.log("result",result)
    console.log("result.meta.requestStatus",result.meta)
      if (result) {
        const user = result;
  
        if (user?.uid) {
          // Retrieve local cart after successful login
          const localCart = JSON.parse(localStorage.getItem("cart")) || [];
  
          // Upload the local cart to the server
          if (localCart.length > 0) {
            try {
              await Promise.all(
                localCart.map((item) =>
                  dispatch(
                    addToCart({
                      userId: user.uid,
                      productId: item.id,
                      quantity: item.quantity,
                    })
                  )
                )
              );
             const updatedcart = await dispatch(fetchCart(user.uid)).unwrap(); 
              console.log("updated cart",updatedcart)
         
              console.log("All items added successfully.");
            } catch (error) {
              console.error("Error adding items to cart:", error);
            }
          }
  
          // Navigate to the login page after successful cart upload
          navigate("/"); 
        } else {
          console.error("User UID is not available.");
        }
      } else {
        console.error("User not found.");
      }
    
    } catch (error) {
      console.error("Login process failed:", error);
    }
  };
  

  useEffect(() => {
    
    if (user && !loading) {
      if(user.role === "admin") {
      navigate("/admin/dashboard");
    }else
    {
      navigate("/dashboard");
    }
  }
  },[user,navigate]);

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
