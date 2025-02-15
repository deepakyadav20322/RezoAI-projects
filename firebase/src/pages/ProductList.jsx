import React, { useEffect, useState } from "react";
import ProductCard from "../components/Product/ProductCard";
import ProductSidebar from "../components/Product/ProductSidebar";
import { useDispatch, useSelector } from "react-redux";
import { FaSpider, FaTimes } from "react-icons/fa";

import { fetchAllProducts } from "../features/Product/ProductSlice";
const ProductList = () => {
  const [filters, setFilters] = useState({
    priceRange: [0, 100000],
    categories: [],
    priceOrder: "asc",
  });


 const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  // This function will be called when filters are updated in the Sidebar
  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    let filtered = products;

    // Filter by Price Range
    filtered = filtered.filter((product) => {
      const price = parseFloat(product.price); // Ensures price is treated as a number
      const priceAfterDiscount =
        price - (price * product.discountPercentage) / 100;
      return (
        priceAfterDiscount >= filters.priceRange[0] &&
        priceAfterDiscount <= filters.priceRange[1]
      );
    });

    // Filter by Categories (if categories are selected)
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    // Sort by Price
    filtered.sort((a, b) =>
      filters.priceOrder === "asc" ? a.price - b.price : b.price - a.price
    );

    setFilteredProducts(filtered);
  }, [filters, products]);

  return (
    // <div className="flex flex-col md:flex-row md:justify-start md:items-start items-center max-w-dvw w-full mx-auto gap-10 my-10 relative px-4 ">
    //       <button
    //     className="md:hidden flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-md mb-4"
    //     onClick={() => setIsSideBarOpen(!isSideBarOpen)}
    //   >
    //     <FaSpider className="w-6 h-6" /> Filters
    //   </button>

    //   {/* Sidebar */}
    //   <div
    //     className={`fixed md:relative top-0 left-0 w-3/4 md:w-1/6 h-full md:h-auto bg-white md:bg-transparent p-5 shadow-lg md:shadow-none transition-transform transform ${
    //       isSideBarOpen ? "translate-x-0" : "-translate-x-full"
    //     } md:translate-x-0 md:block z-50 md:z-auto`}
    //   >
    //     <ProductSidebar filters={filters} onFilterChange={handleFilterChange} />
    //     <button
    //       className="md:hidden mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
    //       onClick={() => setIsSideBarOpen(false)}
    //     >
    //       Close
    //     </button>
    //   </div>
    //   <div className="w-full mx-auto">
    //     {loading && (
    //       <div className="fixed top-0 left-0 w-full h-full bg-black/1 backdrop-blur-sm flex justify-center items-center z-50">
    //         <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
    //       </div>
    //     )}
    //     <p className="text-xl font-semibold py-2 text-center">
    //       Your All Products 🎉
    //     </p>
    //     <div className="w-5/6  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    //       {filteredProducts.length === 0 ? (
    //         <p className="text-center">No products available</p>
    //       ) : (
    //         filteredProducts.map((product) => (
    //           <ProductCard key={product.id} {...product} />
    //         ))
    //       )}
    //     </div>
    //   </div>
    //   {/* </div> */}
    // </div>



    <div className="flex flex-col md:flex-row md:justify-center min-h-screen bg-gray-100 relative">
    {/* Mobile Filter Button */}
    <button
      className="md:hidden fixed top-24 left-4 z-50  items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-md flex"
      onClick={() => setIsSideBarOpen(!isSideBarOpen)}
    >
      <FaSpider className="sm:w-6 sm:h-6 w-4" /><span className="hidden sm:inline-block"> Filters</span>
    </button>

    {/* Sidebar */}
    <div
      className={`fixed md:sticky md:top-20 md:left-6 inset-y-0 left-0  h-full bg-white md:bg-transparent shadow-lg md:shadow-xs transform transition-transform duration-300 ease-in-out ${
        isSideBarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 z-100 md:z-10`}
    >
      <div className="">
        <ProductSidebar filters={filters} onFilterChange={handleFilterChange} />
      </div>
      <button
        className="md:hidden absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-md"
        onClick={() => setIsSideBarOpen(false)}
      >
        <FaTimes className="w-5 h-5" />
      </button>





    </div>

 
    <div className="flex flex-col justify-center items-center p-6 md:p-10">
      {/* Loading Spinner---------- */}
      {loading && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      )}

      {/* Product List Header */}
      <h1 className="text-xl sm:text-2xl  font-bold text-center mb-8">
        Your All Products 🎉
      </h1>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600">No products available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  </div>
);

};

export default ProductList;
