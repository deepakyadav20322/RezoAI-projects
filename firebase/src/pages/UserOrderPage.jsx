// import React, { useEffect, useState } from 'react';
// import { db } from '../firebase';
// import {
//   collection,
//   getDocs,
//   query,
//   where,
//   updateDoc,
//   doc,
// } from 'firebase/firestore';
// import { useSelector } from 'react-redux';

// const UserOrderPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useSelector((state) => state.auth);
//   const userId = user?.uid;

//   // Fetch orders for the logged-in user
//   useEffect(() => {
//     const fetchOrders = async () => {
//         if (!userId) return;
//         try {
//           const ordersRef = collection(db, 'orders');
//           const q = query(ordersRef, where('userId', '==', userId));
//           const querySnapshot = await getDocs(q);
//           const ordersData = querySnapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }));
      
//           // Sort orders by 'createdAt' in ascending order
//           const sortedOrders = ordersData.sort((a, b) => {
//             return a.createdAt.seconds - b.createdAt.seconds;
//           });
      
//           setOrders(sortedOrders);
//           setLoading(false);
//         } catch (error) {
//           console.error('Error fetching orders:', error);
//           setLoading(false);
//         }
//       };
      

//     fetchOrders();
//   }, [userId]);

//   // Cancel order functionality
//   const cancelOrder = async (orderId) => {
//     try {
//       const orderRef = doc(db, 'orders', orderId);
//       await updateDoc(orderRef, { OrderStatus: 'cancelled' });
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order.id === orderId ? { ...order, OrderStatus: 'cancelled' } : order
//         )
//       );
//     } catch (error) {
//       console.error('Error cancelling order:', error);
//     }
//   };

// //   if (loading) {
// //     return (
    
// //     );
// //   }

//   return (
//     <div className="p-4 md:p-8 max-w-7xl mx-auto">
//       <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6">
//         Your Orders
//       </h1>
//       {loading ? (
//           <div className="p-4 md:p-8 max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {[...Array(6)].map((_, index) => (
//               <div key={index} className="bg-white p-3 rounded-md shadow animate-pulse">
//                 <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
//                 <div className="space-y-2">
//                   <div className="h-3 bg-gray-200 rounded"></div>
//                   <div className="h-3 bg-gray-200 rounded w-5/6"></div>
//                   <div className="h-3 bg-gray-200 rounded w-3/4"></div>
//                 </div>
//                 <div className="mt-4 space-y-2">
//                   <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//                   <div className="h-3 bg-gray-200 rounded w-2/3"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//     ): (orders.length === 0 ? (
//         <p className="text-center text-xs text-gray-500">
//           You have no orders yet.
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {orders.map((order) => {
//             let statusColor;
//             switch (order.OrderStatus) {
//               case 'processing':
//                 statusColor = 'bg-orange-400';
//                 break;
//               case 'shipped':
//                 statusColor = 'bg-blue-400';
//                 break;
//               case 'delivered':
//                 statusColor = 'bg-green-400';
//                 break;
//               case 'cancelled':
//                 statusColor = 'bg-red-400';
//                 break;
//               default:
//                 statusColor = 'bg-yellow-400';
//             }
//             return (
//               <div
//                 key={order.id}
//                 className="bg-white p-3 rounded-md shadow hover:shadow-md transition duration-200"
//               >
//                 <div className="flex justify-between items-center mb-1">
//                   <span
//                     className={`text-xs px-2 py-1 text-white rounded ${statusColor}`}
//                   >
//                     {order.OrderStatus || 'N/A'}
//                   </span>
//                   <span className="text-xs text-gray-500">ID: {order.id}</span>
//                 </div>
//                 <div className="text-xs text-gray-800">
//                   <p>
//                     <strong>Total:</strong> ₹{order.grandTotal}
//                   </p>
//                   <p>
//                     <strong>Shipping:</strong> ₹{order.shippingCost}
//                   </p>
//                   <p>
//                     <strong>Date:</strong>{' '}
//                     {order.createdAt
//                       ? new Date(order.createdAt.seconds * 1000).toLocaleDateString()
//                       : 'N/A'}
//                   </p>
//                 </div>
//                 <div className="mt-2 text-xs">
//                   <h3 className="font-medium text-gray-900">Products:</h3>
//                   <ul className="list-disc pl-4 text-gray-700">
//                     {order.products.map((product, index) => (
//                       <li key={index}>
//                         ID: {product.productId} - Qty: {product.quantity}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//                 {order.OrderStatus !== 'cancelled' &&
//                   order.OrderStatus !== 'delivered' && (
//                     <button
//                       onClick={() => cancelOrder(order.id)}
//                       className="mt-2 block w-full text-xs bg-red-500 hover:bg-red-600 text-white rounded py-1"
//                     >
//                       Cancel Order
//                     </button>
//                   )}
//               </div>
//             );
//           })}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UserOrderPage;


// ==========================================================>>>>>

// for real time status reflection we use here snapshot features of firebase

import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';

const UserOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const userId = user?.uid;

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('userId', '==', userId));

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort orders by 'createdAt'
      const sortedOrders = ordersData.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);

      setOrders(sortedOrders);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe on unmount
  }, [userId]);

  // Cancel order function
  const cancelOrder = async (orderId) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { OrderStatus: 'cancelled' });
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6">
        Your Orders
      </h1>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white p-3 rounded-md shadow animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <p className="text-center text-xs text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => {
            let statusColor;
            switch (order.OrderStatus) {
              case 'processing':
                statusColor = 'bg-orange-400';
                break;
              case 'shipped':
                statusColor = 'bg-blue-400';
                break;
              case 'delivered':
                statusColor = 'bg-green-400';
                break;
              case 'cancelled':
                statusColor = 'bg-red-400';
                break;
              default:
                statusColor = 'bg-yellow-400';
            }
            return (
              <div
                key={order.id}
                className="bg-white p-3 rounded-md shadow hover:shadow-md transition duration-200"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-xs px-2 py-1 text-white rounded ${statusColor}`}>
                    {order.OrderStatus || 'N/A'}
                  </span>
                  <span className="text-xs text-gray-500">ID: {order.id}</span>
                </div>
                <div className="text-xs text-gray-800">
                  <p><strong>Total:</strong> ₹{order.grandTotal}</p>
                  <p><strong>Shipping:</strong> ₹{order.shippingCost}</p>
                  <p>
                    <strong>Date:</strong>{' '}
                    {order.createdAt
                      ? new Date(order.createdAt.seconds * 1000).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </div>
                <div className="mt-2 text-xs">
                  <h3 className="font-medium text-gray-900">Products:</h3>
                  <ul className="list-disc pl-4 text-gray-700">
                    {order.products.map((product, index) => (
                      <li key={index}>
                        ID: {product.productId} - Qty: {product.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
                {order.OrderStatus !== 'cancelled' && order.OrderStatus !== 'delivered' && (
                  <button
                    onClick={() => cancelOrder(order.id)}
                    className="mt-2 block w-full text-xs bg-red-500 hover:bg-red-600 text-white rounded py-1"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserOrderPage;





















