import { useState, useMemo, useEffect } from "react";
import { useData } from "../context/DataContext";

const usePagination = (data, rowsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { setRows } = useData();

  // Reset to first page when rowsPerPage or data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [rowsPerPage, data]);

  // Calculate total pages once
  const totalPages = useMemo(() => Math.ceil(data.length / rowsPerPage), [data, rowsPerPage]);

  // Compute paginated rows
  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return data.slice(startIndex, startIndex + rowsPerPage);
  }, [data, currentPage, rowsPerPage]);

  // Update global rows state (if needed)
//   useEffect(() => {
//     setRows(paginatedRows);
//   }, [paginatedRows, setRows]);

  // Pagination function
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return { paginatedRows, currentPage, paginate, totalPages };
};

export default usePagination;
