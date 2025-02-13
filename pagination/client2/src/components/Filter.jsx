import React from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';

const Filter = ({ filter, index, onFilterChange, availableColumns, searchColumnsValue, onSearchChange, onRemove }) => {
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
    <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-md w-full">
      <button onClick={() => onRemove(index)} className="text-red-400 hover:text-red-500">
        <X className="w-4 h-4" />
      </button>
      
      <select
        className="rounded-md border px-2 py-1 focus:ring-1 focus:ring-indigo-500 bg-white text-black"
        value={filter.where}
        onChange={(e) => onFilterChange(index, "where", e.target.value)}
      >
        <option value={index === 0 ? "WHERE" : "AND"}>{index === 0 ? "WHERE" : "AND"}</option>
        {index > 0 && (
          <>
            <option value="OR">OR</option>
          </>
        )}
      </select>

      <div className="relative flex w-full justify-center items-center">
        <select
          className="w-28 rounded-md border px-2 py-1 focus:ring-1 focus:ring-indigo-500 bg-white text-black"
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
      </div>

      <select
        className="rounded-md border px-2 py-1 focus:ring-1 focus:ring-indigo-500 bg-white text-black"
        value={filter.condition}
        onChange={(e) => onFilterChange(index, "condition", e.target.value)}
      >
        {filterOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label} ({option.sign})
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Value"
        className="rounded-md border px-2 py-1 focus:ring-1 focus:ring-indigo-500 bg-white text-black"
        value={filter.value}
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
  onSearchChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Filter; 


