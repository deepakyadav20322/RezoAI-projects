import React from "react";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Navbar = () => {
  const totalCartItems = useSelector((state) => state.cart.totalQuantity);

  const handleSearch = (e) => {

  }

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">

        <Link to="/" className="text-2xl font-bold hover:text-gray-300">
          RTKshop
        </Link>

      
        <div className="hidden md:flex items-center bg-gray-800 rounded-lg overflow-hidden">
          <input
          onClick={handleSearch}
            type="text"
            className="px-4 py-2 text-gray-200 bg-gray-800 outline-none w-80"
            placeholder="Search products..."
          />
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600">
            <FaSearch className="text-gray-300" size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link href="/cart" className="flex items-center gap-1 hover:text-gray-300">
            <FaShoppingCart size={24} />
            Cart-{totalCartItems}
          </Link>
        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
