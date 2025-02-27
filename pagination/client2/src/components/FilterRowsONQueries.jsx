import React, { useState } from "react";
import { Filter } from "lucide-react";
import FilterComponent from './Filter';
import { useData } from "../context/DataContext";
import OutSideClick from "../hooks/OutSideClick";
import { motion } from "framer-motion";

const FilterQueryBuilder = () => {
  const { headers, setFilteredData, rows, setRows, data } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [searchColumnsValue, setSearchColumnsValue] = useState("");
  const [filters, setFilters] = useState([
    { where: "WHERE", column: "", condition: "equals", value: "" },
  ]);

  const filterRef = OutSideClick(() => setIsOpen(false));

  const availableColumns = headers.map((h) => h.accessor);

  const handleAddFilter = () => {
    setFilters([...filters, { where: "AND", column: "", condition: "equals", value: "" }]);
  };

  const handleFilterChange = (index, field, value) => {

    const newFilters = [...filters];
  
    newFilters[index][field] = value;
    console.log(value,index)
    
    setFilters(newFilters);
   
   
  };

  const handleRemoveFilter = (index) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters([{ where: "WHERE", column: "", condition: "equals", value: "" }]);
    setSearchColumnsValue("");
    setRows(data);
    setFilteredData(data);
  };

  const applyFilters = () => {
    const validFilters = filters.filter(filter => filter.column && filter.value);

    if (validFilters.length === 0) {
      console.warn("No valid filters applied.");
      setRows(data);
      setFilteredData(data);
      return;
    }

    const query = validFilters
      .map((filter, index) => {
        const logic = index === 0 ? "WHERE" : filter.where;
        return `${logic} ${filter.column} ${filter.condition} '${filter.value}'`;
      })
      .join(' ');

    console.log("Generated Query:", query);

    try {
      const filteredData = filterData(query);
      // console.log("Filtered Data:", filteredData);
      setRows(filteredData);
      setFilteredData(filteredData);
    } catch (error) {
      console.error("Error filtering data:", error);
      setRows(data);
      setFilteredData(data);
    }
  };

  const filterData = (query) => {
    if (typeof query !== 'string') {
      console.error("Invalid query type:", typeof query);
      return rows; // Return original rows if query is invalid
    }

    const conditions = query.match(/(WHERE|AND|OR)\s+([\w]+)\s+(equals|notEquals|greater|greaterOrEquals|less|lessOrEquals|like|notLike|in|isNull|isNotNull)\s+'([^']+)'/g);
  console.log("condition match->",conditions)
    if (!conditions) {
      console.warn("No valid conditions found in the query.");
      return rows;
    }
// changes make rows to data
    let filteredRows = [...data];

    for (const condition of conditions) {
      const [_, logic, column, operator, value] = condition.match(/(WHERE|AND|OR)\s+([\w]+)\s+(equals|notEquals|greater|greaterOrEquals|less|lessOrEquals|like|notLike|in|isNull|isNotNull)\s+'([^']+)'/);

      const parsedValue = parseValue(value, column);

      const conditionResult = filteredRows.filter(row => {
        const rowValue = row[column];
        console.log("Row Value:", rowValue); // Log the value being checked
        console.log("Condition:", { operator, parsedValue }); // Log the condition being applied

        switch (operator) {
          case 'equals':
            return rowValue === parsedValue;
          case 'notEquals':
            return rowValue !== parsedValue;
          case 'greater':
            return rowValue > parsedValue;
          case 'greaterOrEquals':
            return rowValue >= parsedValue;
          case 'less':
            return rowValue < parsedValue;
          case 'lessOrEquals':
            return rowValue <= parsedValue;
          case 'like':
            return typeof rowValue === 'string' && rowValue.includes(value);
          case 'notLike':
            return typeof rowValue === 'string' && !rowValue.includes(value);
          case 'in':
            return Array.isArray(rowValue) && rowValue.includes(parsedValue);
          case 'isNull':
            return rowValue === null;
          case 'isNotNull':
            return rowValue !== null;
          default:
            return true;
        }
      });

      if (logic === "WHERE") {
        filteredRows = conditionResult;
      } else if (logic === "AND") {
        filteredRows = filteredRows.filter(row => conditionResult.includes(row));
      } else if (logic === "OR") {
        filteredRows = [...new Set([...filteredRows, ...conditionResult])];
      }
    }

    return filteredRows;
  };

  const parseValue = (value, column) => {
    if (!isNaN(value)) return Number(value); // Convert to number if it's numeric
    if (value === "true" || value === "false") return value === "true"; // Convert to boolean
    return value; // Return as string
  };

  return (
    
    <motion.div 
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="relative inline-block text-sm">
      <button
      
        onClick={(e) =>{
          e.stopPropagation();
           setIsOpen(!isOpen)
          }}
        className="flex items-center justify-center px-4 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-nowrap gap-x-2"
      >
        <Filter className="w-4 h-4" />
        <span className="font-medium">Filters</span>
      </button>

      {isOpen && (
        <motion.div 
          exit={{ opacity: 0, y: -5 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
          className="absolute left-0 mt-2 min-w-80 bg-white border-2 border-gray-400 rounded-lg shadow-xl p-4 z-10 space-y-3" 
          ref={filterRef}
        >
          {filters.map((filter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <FilterComponent
                filter={filter}
                index={index}
                onFilterChange={handleFilterChange}
                availableColumns={availableColumns}
                searchColumnsValue={searchColumnsValue}
                onSearchChange={(e) => setSearchColumnsValue(e.target.value)}
                onRemove={handleRemoveFilter}
              />
            </motion.div>
          ))}
          <motion.div 
            className="flex w-full gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <button
              onClick={handleAddFilter}
              className="w-full text-center bg-slate-300 text-black px-3 py-2 rounded-md hover:bg-slate-300 text-nowrap"
            >
              + Add filter
            </button>
            <button
              onClick={clearFilters}
              className="w-full text-center text-red-600 px-3 py-2 rounded-md bg-red-100 hover:bg-red-100 text-nowrap"
            >
              Clear Filters
            </button>
            <button
              onClick={applyFilters}
              className="w-full text-center bg-black text-white px-3 py-2 rounded-md hover:bg-black"
            >
              Apply
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FilterQueryBuilder;