import React, { useEffect, useState } from "react";
import usePagination from "../hooks/usePagination";
import { useData } from "../context/DataContext";

const PaginationBox = () => {
    const { data,setRows,rowsPerPage,setRowsPerPage } = useData();
   
    const { paginatedRows, currentPage, paginate, totalPages } = usePagination(data, rowsPerPage);
    //  setRows(paginatedRows)


    const handleRowsPerPageChange = (e) => {
        const newValue = Number(e.target.value);
        setRowsPerPage(newValue > 0 ? newValue : 1);  // Ensure rowsPerPage is at least 1
    };

     useEffect(() => {
        setRows(paginatedRows)
    }
    , [paginatedRows])

    return (
        <div className="flex items-center space-x-2">
            {/* 🔹 Previous Page Button */}
            <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="border border-gray-300 px-2 py-1   w-22  hover:bg-gray-800 bg-black text-white rounded-lg"
            >
                Previous
            </button>

            {/* 🔹 Input for Rows Per Page */}
            <input
               
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                className="border border-gray-300 px-2 py-1  outline-none focus:border-blue-500 w-16 text-center"
            />

            <span className="mx-2">Page {currentPage} of {totalPages}</span>

            {/* 🔹 Next Page Button */}
            <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border border-gray-300 px-2 py-1 w-22  hover:bg-gray-800 bg-black text-white rounded-lg"
            >
                Next
            </button>
        </div>
    );
};

export default PaginationBox;
