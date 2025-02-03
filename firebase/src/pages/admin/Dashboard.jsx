// import React from "react";
// import { useState } from "react";
// import AddProduct from "../../components/admin/AddProduct";
// import Products from "../../components/admin/AllProducts";
// import AllOrders from "../../components/admin/AllOrders";

// const Dashboard = () => {
//   const [visibleComp, setVisibleComp] = useState("products"); // products, addProduct, editProduct

//   return (
//     <>
//       <div className="text-xl font-medium px-4 py-2">Admin dashboard</div>
//       <div className="flex gap-4">
//         <div className="flex gap-4 my-4">
//           {/* Sidebar */}
//           <div className="w-full max-w-xs p-4 bg-white rounded-xl shadow-md border border-gray-200 max-h-[80vh] overflow-y-hidden sticky top-24 h-full ">
//             <div className="p-4 bg-gray-50 rounded-lg h-screen">
//               <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
//                 Admin Actions
//               </h2>
//               <div className="flex flex-col gap-4">
//                 <button
//                   onClick={() => setVisibleComp("addProduct")}
//                   className="w-full py-2 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   Add Product
//                 </button>

//                 <button
//                   onClick={() => setVisibleComp("products")}
//                   className="w-full py-2 px-4 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
//                 >
//                   View Products
//                 </button>
               

//                 <button
//                   onClick={() => setVisibleComp("allOrders")}
//                   className="w-full py-2 px-4 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 >
//                   All Orders
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1">
//           {visibleComp === "products" && (
//             <Products setVisibleComp={setVisibleComp} />
//           )}
//           {visibleComp === "addProduct" && (
//             <AddProduct setVisibleComp={setVisibleComp} />
//           )}
         
//           {visibleComp === "allOrders" && (
//             <AllOrders setVisibleComp={setVisibleComp} />
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;


import React from 'react'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)
  return (
  

      <div className="flex-1">
        {/* main content */}

          <h1 className='font-bold text-3xl'>This is Admin dashboard</h1>
          <div className="mt-4 p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mt-6">
              <div>
                <h2 className="text-xl font-semibold">Profile Information</h2>
                <p className="text-gray-600">Email: {user.email}</p>
                <p className=" bg-red-300 text-black rounded-2xl px-2 text-sm">Role: {user.role}</p>
               
              </div>
              <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
            </div>
          </div>
      </div>
 
  )
}

export default Dashboard