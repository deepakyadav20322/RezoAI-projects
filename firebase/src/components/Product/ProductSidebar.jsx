import React, { useState } from "react";
import {Category} from '../../Constant/Category'

const ProductSidebar = ({ filters, onFilterChange }) => {
  const [minPrice, setMinPrice] = useState(filters.priceRange[0] || "");
  const [maxPrice, setMaxPrice] = useState(filters.priceRange[1] || "");
  const [selectedCategories, setSelectedCategories] = useState(filters.categories || []);
  const [priceOrder, setPriceOrder] = useState(filters.priceOrder || "asc");

  const handlePriceChange = (index, value) => {
    const parsedValue = value === "" ? "" : parseInt(value, 10);
    if (value === "" || !isNaN(parsedValue)  && parsedValue <= 100000) {
      index === 0 ? setMinPrice(value) : setMaxPrice(value);
    }
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
  };

  const handlePriceOrderChange = (order) => {
    setPriceOrder(order);
  };

  const applyFilters = () => {
    onFilterChange({
      priceRange: [minPrice === "" ? 0 : parseInt(minPrice, 10), maxPrice === "" ? 100000 : parseInt(maxPrice, 10)],
      categories: selectedCategories,
      priceOrder,
    });
    console.log("Filters Applied:", { 
      priceRange: [minPrice === "" ? 0 : parseInt(minPrice, 10), maxPrice === "" ? 100000 : parseInt(maxPrice, 10)],
      categories: selectedCategories,
      priceOrder,
    });
  };

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategories([]);
    setPriceOrder("asc");
    onFilterChange({ priceRange: [0, 100000], categories: [], priceOrder: "asc" });
  };

  return (
    <aside className="w-64 bg-white shadow-lg p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">PRICE</h3>
        <button onClick={clearFilters} className="text-blue-500 text-sm font-medium">CLEAR</button>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <input
          type="number"
          value={minPrice}
          onChange={(e) => handlePriceChange(0, e.target.value)}
          className="w-20 px-2 py-1 border rounded"
          min="0"
          placeholder="Min"
        />
        <span>to</span>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => handlePriceChange(1, e.target.value)}
          className="w-20 px-2 py-1 border rounded"
          min="0"
          placeholder="Max"
        />
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Categories</h3>
        {Category.map((category) => (
          <label key={category} className="flex items-center space-x-2 mb-1">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span>{category}</span>
          </label>
        ))}
      </div>

      <div>
        <h3 className="font-medium mb-2">Price Order</h3>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              checked={priceOrder === "asc"}
              onChange={() => handlePriceOrderChange("asc")}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span>Low to High</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              checked={priceOrder === "desc"}
              onChange={() => handlePriceOrderChange("desc")}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span>High to Low</span>
          </label>
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Apply Filters
      </button>
    </aside>
  );
};

export default ProductSidebar;
