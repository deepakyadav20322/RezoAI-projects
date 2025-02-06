import React, { useEffect, useState } from "react";
import ProductCard from "../components/Product/ProductCard";
import ProductSidebar from "../components/Product/ProductSidebar";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllProducts } from "../features/Product/ProductSlice";
const ProductList = () => {
  const [filters, setFilters] = useState({
    priceRange: [0, 100000],
    categories: [],
    priceOrder: "asc",
  });

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
    <div className="flex justify-start items-start max-w-dvw w-full mx-auto gap-10 my-10 relative px-4 ">
      <div className=" w-1/6 sticky top-28 z-20">
        <ProductSidebar filters={filters} onFilterChange={handleFilterChange} />
      </div>
      <div className="w-full mx-auto">
        {loading && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/1 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          </div>
        )}
        <p className="text-xl font-semibold py-2 text-center">
          Your All Products 🎉
        </p>
        <div className="w-5/6  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.length === 0 ? (
            <p className="text-center">No products available</p>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          )}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default ProductList;
