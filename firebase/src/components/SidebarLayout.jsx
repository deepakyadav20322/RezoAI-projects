
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SidebarLayout = ({}) => {
// This layout for the user dashboard and related to the user

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex h-screen">
      <div className="bg-slate-200 w-56 p-6 flex flex-col">
        <div className="flex items-center mb-8 text-black">
          <div className="w-12 h-12 bg-gray-500 rounded-full flex justify-center items-center text-xl font-semibold">
            {user?.name ? user.name.charAt(0) : 'U'}
          </div>
          <div className="ml-4 text-xl font-bold">{user?.name}</div>
        </div>
        <div className="space-y-6">
          <Link to="/dashboard" className="flex items-center space-x-2 text-lg hover:text-blue-400">
            <i className="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
          {/* <Link to="/profile" className="flex items-center space-x-2 text-lg hover:text-blue-400">
            <i className="fas fa-user"></i>
            <span>Profile</span>
          </Link> */}
          <Link to="/dashboard/orders" className="flex items-center space-x-2 text-lg hover:text-blue-400">
            <i className="fas fa-box"></i>
            <span>Orders</span>
          </Link>
          <Link to="/settings" className="flex items-center space-x-2 text-lg hover:text-blue-400 cursor-not-allowed pointer-events-none opacity-50">
            <i className="fas fa-cogs"></i>
            <span>Settings</span>
          </Link>
        </div>
      </div>
      <div className="flex-1 bg-gray-100 p-8">
        {/* Main content of the Dashboard */}
       <Outlet />   
      </div>
    </div>
  );
}

export default SidebarLayout;
