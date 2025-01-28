import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useGetAllProductsWithSearchQuery } from "../features/products/ProductAPI";


const ProductList = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [pagination, setPagination] = useState({ limit: 30, skip: 0 });

  const {
    data: products,
    isLoading,
    isError,
    refetch
  } = useGetAllProductsWithSearchQuery({
    search: searchQuery,
    sort: sortBy,
    ...pagination,
  });



  console.log('renders ')

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching products</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Products</h1>

     
      <div className="my-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

   
      <div className="my-6">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sort By</option>
          <option value="title-asc">title and acending order</option>
          <option value="title-desc">title and descending order</option>
        </select>
      </div>

   
      <div className="w-full max-w-7xl mx-auto py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 my-8">
        <button
          onClick={() =>
            setPagination((prev) => ({ ...prev, skip: prev.skip - prev.limit }))
          }
          disabled={pagination.skip === 0}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={() =>
            setPagination((prev) => ({ ...prev, skip: prev.skip + prev.limit }))
          }
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ProductList;