

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FaCheckCircle, FaPrint, FaTruck } from "react-icons/fa";
import OrderConfirmationLoading from "../components/OrderConfirmationLoading";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderAndProducts = async () => {
      try {
        const orderRef = doc(db, "orders", orderId);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
          const orderData = orderSnap.data();
          setOrder(orderData);

          // Map over the products array
          const productPromises = orderData.products.map(async (product) => {
            const productRef = doc(db, "products", product.productId);
            const productSnap = await getDoc(productRef);
            console.log({ id: product.productId, ...productSnap.data() });
            return productSnap.exists()
              ? { id: product.productId, ...productSnap.data() }
              : null;
          });

          // Wait for all product data to be fetched
          const fetchedProducts = await Promise.all(productPromises);
          setProducts(fetchedProducts.filter(Boolean)); // Filter out null values
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderAndProducts();
  }, [orderId]);

  if (!order)
    return (
      <div className="text-center">
        <OrderConfirmationLoading />
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8 rounded-lg shadow-md border border-gray-200">
      <div className="mb-6 bg-green-100 text-center py-4 px-6 rounded-lg">
        <h1 className="text-2xl font-bold text-green-500 flex items-center gap-2">
          <FaCheckCircle />
          Order Confirmed
        </h1>
      </div>

      <div className="p-4">
        <div className="flex justify-between mt-4 text-sm">
          <div>
            <h3 className="font-semibold">Order Summary</h3>
            <p>Date: {order?.createdAt?.toDate().toLocaleDateString()}</p>
            <p>Shipping: ₹{order?.shippingCost}</p>
            <p>
              Total: <span className="font-semibold">₹{order?.grandTotal}</span>
            </p>
            <p>Payment ID: {order?.paymentId}</p>
          </div>
          <div>
            <h3 className="font-semibold">Shipping Details</h3>
            <p>
              {order?.firstName} {order?.lastName}
            </p>
            <p>{order?.address}</p>
            <p>
              {order?.city}, {order?.zipCode}
            </p>
            <p>{order?.country}</p>
          </div>
        </div>

        <hr className="my-6" />

        <div className="space-y-4">
          <h3 className="font-semibold">Items Ordered</h3>
          <div className="flex flex-col gap-4 max-h-96 overflow-y-auto">
            {loading
              ? Array(2)
                  .fill(0)
                  .map((_, idx) => <SkeletonLoader key={idx} />)
              : products?.map((item) => {
                  const productInOrder = order?.products?.find(
                    (p) => p.productId === item.id
                  );
                  const quantity = productInOrder?.quantity || 0;

                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        {item.thumbnail ? (
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-24 h-24 object-cover rounded"
                          />
                        ) : (
                          <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-gray-500">No Image</span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-green-600">
                            {item?.discountPercentage || 0}% off
                          </p>
                          <p className="text-blue-600">Qty: {quantity}</p>
                          <p className="text-sm text-gray-500">
                            SKU: {item.sku || "N/A"}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold">₹{item.price}</p>
                    </div>
                  );
                })}
          </div>
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded-lg flex items-center gap-2">
          <FaTruck className="text-blue-500" />
          <p className="text-blue-600">
            Expected delivery:{" "}
            {order.estimatedDeliveryDate || "To be determined"}
          </p>
        </div>

        <div className="flex justify-between mt-6">
          <Link
            to="/dashboard/orders"
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            View Orders
          </Link>
          <button className="px-4 py-2 border rounded hover:bg-gray-50">
            Need Help?
          </button>
          <Link
            to="/products"
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;

const SkeletonLoader = () => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 bg-gray-200 rounded-lg animate-pulse" />
        <div className="space-y-2">
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
    </div>
  );
};
