import React, { useState } from "react"

const ProductSidebar = ({ categories, onFilterChange }) => {
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(100000)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortOrder, setSortOrder] = useState("")

  const handlePriceChange = () => {
    onFilterChange({
      minPrice,
      maxPrice,
      selectedCategory,
      sortOrder,
    })
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    onFilterChange({
      minPrice,
      maxPrice,
      selectedCategory: category,
      sortOrder,
    })
  }

  const handleSortChange = (e) => {
    setSortOrder(e.target.value)
    onFilterChange({
      minPrice,
      maxPrice,
      selectedCategory,
      sortOrder: e.target.value,
    })
  }

  return (
    <div className="w-64 bg-white shadow-lg p-4 rounded-lg">
      {/* Price Range Filter */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        <input
          type="range"
          min="0"
          max="100000"
          step="100"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>0</span>
          <span>{minPrice}</span>
          <span>100000</span>
        </div>
        <input
          type="range"
          min={minPrice}
          max="100000"
          step="100"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full mt-4"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>{minPrice}</span>
          <span>{maxPrice}</span>
          <span>100000</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Categories</h3>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                id={category}
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => handleCategoryChange(category)}
                className="mr-2"
              />
              <label htmlFor={category} className="text-sm text-gray-700">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Sort By</h3>
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Sort Order</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Add Additional Filters */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Additional Filters</h3>
        <p className="text-sm text-gray-500">You can add more filters here (e.g., brand, rating, etc.).</p>
      </div>

      {/* Apply Filters Button */}
      <div className="mt-4">
        <button
          onClick={handlePriceChange}
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>
    </div>
  )
}

export default ProductSidebar
