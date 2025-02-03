import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const AdminSidebarLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 p-4 bg-white rounded-xl shadow-md border border-gray-200 h-[90vh] overflow-y-auto sticky top-24">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Admin Actions
          </h2>
          <div className="flex flex-col gap-4">
            <Link
              to="/admin/dashboard/add-product"
              className="w-full py-2 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Product
            </Link>

            <Link
              to="/admin/dashboard/products"
              className="w-full py-2 px-4 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              View Products
            </Link>

            <Link
              to="/admin/dashboard/all-orders"
              className="w-full py-2 px-4 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              All Orders
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Outlet will render the matched route component here */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminSidebarLayout;
