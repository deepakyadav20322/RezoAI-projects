import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaFilter, FaTimes } from "react-icons/fa";
import { db } from "../../firebase"; // Assuming your Firebase config is correct
import { collection, doc, getDocs, updateDoc} from "firebase/firestore";

const ITEMS_PER_PAGE = 10;

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersCollection = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersList = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched Orders: ", ordersList); // Check the structure of the fetched orders
      setOrders(ordersList);
    };

    fetchOrders();
  }, []);

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.OrderStatus === statusFilter);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const statusColors = {
    processing: "bg-amber-100 text-amber-700",
    shipped: "bg-blue-100 text-blue-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };


    // console.log(`Updating order ${orderId} to ${newStatus}`);

    const handleStatusChange = async (orderId, newStatus) => {
        console.log(`Updating order ${orderId} to ${newStatus}`);
        // return
        try {
          // Get the order document reference
          const orderDocRef = await doc(db, "orders", orderId);
      
          // Update the order status in Firestore
          await updateDoc(orderDocRef, {
            OrderStatus: newStatus, // Update the status field
          });
      
          // Log to show the successful update
          console.log(`Order ${orderId} status updated to ${newStatus}`);
      
          // Update the local state to reflect the change
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.id === orderId ? { ...order, OrderStatus: newStatus } : order
            )
          );
        } catch (error) {
          console.error("Error updating order status:", error);
        
    }
  };

  return (
    <div className="w-full px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto border rounded-lg bg-white shadow">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium">Actions</th>
              <th className="px-6 py-3 text-left text-xs font-medium">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">
                  {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">₹{parseFloat(order.grandTotal).toFixed(2)}</td>
                <td className="px-6 py-4">
                  {order.OrderStatus ? (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.OrderStatus]}`}
                    >
                      {order.OrderStatus}
                    </span>
                  ) : (
                    <span className="text-gray-500">No Status</span>
                  )}
                </td>
                <td className="px-6 py-4">
  {["processing", "shipped"].includes(order.OrderStatus) && (
    <select
      value={order.OrderStatus} // Ensure it's bound to the order's current status
      onChange={(e) => handleStatusChange(order.id, e.target.value)}
      className="border rounded-md px-2 py-1 text-sm"
    >
      <option value="">
        Change Status
      </option>
      {order.OrderStatus === "processing" && (
        <>
       
          <option value="shipped">Mark Shipped</option>
          <option value="cancelled">Cancel Order</option>
        </>
      )}
      {order.OrderStatus === "shipped" && (
        <option value="delivered">Mark Delivered</option>
      )}
    </select>
  )}
</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Show Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-700">
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, filteredOrders.length)} of{" "}
          {filteredOrders.length} orders
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="flex items-center px-3 py-2 border rounded-md disabled:opacity-50"
          >
            <FaChevronLeft className="mr-1" /> Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="flex items-center px-3 py-2 border rounded-md disabled:opacity-50"
          >
            Next <FaChevronRight className="ml-1" />
          </button>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-500 opacity-100 backdrop-blur-2xl   flex items-center justify-center z-50">
            
          <div className="bg-white opacity-100 p-6 rounded-md max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Order Details: {selectedOrder.id}
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedOrder.createdAt.seconds * 1000).toLocaleString()}
              </p>
              <p>
                <strong>Total:</strong> ₹{parseFloat(selectedOrder.grandTotal).toFixed(2)}
              </p>
              <p>
                <strong>Shipping:</strong> ₹{selectedOrder.shippingCost.toFixed(2)}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[selectedOrder.status]}`}
                >
                  {selectedOrder.status}
                </span>
              </p>

              <h3 className="font-semibold mt-4">Products:</h3>
              <ul>
                {selectedOrder.products.map((product, index) => (
                  <li key={index} className="mb-2">
                    <p>
                      <strong>Product ID:</strong> {product.productId}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {product.quantity}
                    </p>
                    <p>
                      <strong>Discount:</strong> {product.discountPercentage}%
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
