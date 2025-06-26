import React from "react";
import PropTypes from "prop-types";
import { ChevronDown, Trash2, X } from "lucide-react";

const Filter = ({
  filter,
  index,
  onFilterChange,
  availableColumns,
  searchColumnsValue,
  onSearchChange,
  onRemove,
}) => {
  const filteredColumns = availableColumns.filter((col) =>
    col.toLowerCase().includes(searchColumnsValue.toLowerCase())
  );

  const filterOptions = [
    { label: "equals", value: "equals", sign: "=" },
    { label: "not equals", value: "notEquals", sign: "<>" },
    { label: "greater", value: "greater", sign: ">" },
    { label: "greater or equals", value: "greaterOrEquals", sign: ">=" },
    { label: "less", value: "less", sign: "<" },
    { label: "less or equals", value: "lessOrEquals", sign: "<=" },
    { label: "like", value: "like", sign: "LIKE" },
    { label: "not like", value: "notLike", sign: "NOT LIKE" },
    { label: "in", value: "in", sign: "IN" },
    { label: "is null", value: "isNull", sign: "IS NULL" },
    { label: "is not null", value: "isNotNull", sign: "IS NOT NULL" },
  ];

  return (
    <div className="flex items-center space-x-3 bg-gray-50 border border-gray-300 p-2.5 rounded-lg w-full group hover:bg-gray-100 transition-colors duration-200">
      <button
        onClick={() => onRemove(index)}
        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
        aria-label="Remove filter"
      >
        <X
          color="red"
          className="w-6 h-6 hover:text-red-500 bg-slate-200 rounded-full p-1"
        />
      </button>

      <div className="relative">
        <select
          className="appearance-none w-24 rounded bg-white px-3 py-1.5 pr-8 border border-gray-200 text-sm text-gray-800 hover:border-gray-300 focus:border-gray-400 focus:outline-none focus:ring-0 transition-colors duration-200"
          value={filter.where}
          onChange={(e) => onFilterChange(index, "where", e.target.value)}
        >
          <option value={index === 0 ? "WHERE" : "AND"}>
            {index === 0 ? "WHERE" : "AND"}
          </option>
          {index > 0 && <option value="OR">OR</option>}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>

      <div className="relative flex-grow max-w-[200px]">
        <select
          className="appearance-none rounded bg-white px-3 py-1.5 pr-8 border border-gray-200 text-sm text-gray-800 hover:border-gray-300 focus:border-gray-400 focus:outline-none focus:ring-0 transition-colors duration-200"
          value={filter.column}
          onChange={(e) => onFilterChange(index, "column", e.target.value)}
        >
          <option value="">Select column</option>
          {filteredColumns.map((col) => (
            <option key={col} value={col}>
              {col}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>

      <div className="relative">
        <select
          className="appearance-none w-32 rounded bg-white px-3 py-1.5 pr-8 border border-gray-200 text-sm text-gray-800 hover:border-gray-300 focus:border-gray-400 focus:outline-none focus:ring-0 transition-colors duration-200"
          value={filter.condition}
          onChange={(e) => onFilterChange(index, "condition", e.target.value)}
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        
      </div>
      
      <input
        type="text"
        placeholder="Value"
        className={`flex-grow rounded bg-white px-3 py-1.5 border border-gray-200 text-sm text-gray-900 placeholder-gray-400 hover:border-gray-300 focus:border-gray-400 focus:outline-none focus:ring-0 transition-colors duration-200 ${(filter.condition=="isNull" || filter.condition=="isNotNull")?"disabled:cursor-not-allowed":""}`}
        disabled={filter.condition === "isNull" || filter.condition === "isNotNull"}
        value={(filter.condition === "isNull" || filter.condition === "isNotNull")?"":filter.value}
        onChange={(e) => onFilterChange(index, "value", e.target.value)}
      />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  availableColumns: PropTypes.array.isRequired,
  searchColumnsValue: PropTypes.string.isRequired,
  // onSearchChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Filter;
