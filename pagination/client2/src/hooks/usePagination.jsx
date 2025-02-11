import { useState, useMemo, useEffect,useRef } from "react";
import { useData } from "../context/DataContext";

const usePagination = (data, rowsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);
    const prevPaginatedRowsRef = useRef([]);
const {setRows} = useData();
    // Reset page to 1 when rowsPerPage changes
    useEffect(() => {
        setCurrentPage(1);
    }, [rowsPerPage]);



    const paginatedRows = useMemo(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const slicedData =data.slice(startIndex, startIndex + rowsPerPage);
      
        return slicedData;

    }, [data, currentPage, rowsPerPage]);

   

    const paginate = (pageNumber) => {
        const totalPages = Math.ceil(data.length / rowsPerPage);
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return { paginatedRows, currentPage, paginate, totalPages: Math.ceil(data.length / rowsPerPage) };
};

export default usePagination;
