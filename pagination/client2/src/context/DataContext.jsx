import React, { createContext, useContext, useState, useEffect } from "react";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("https://jsonplaceholder.typicode.com/users");
        const response = await data.json();
        console.log(response);
        setData(response);
        setRows(response);

        const defaultVisibility =
          response.length > 0
            ? Object.keys(response[0]).reduce((acc, key) => {
                acc[key] = true;
                return acc;
              }, {})
            : {};

        setColumnVisibility(defaultVisibility);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

//   // create table columns on besis of data
//   const columns = data.length > 0 ? Object.keys(data[0]) : [];

  

  // Update headers when columnVisibility changes
  useEffect(() => {
    if (data.length > 0) {
      const columns = Object.keys(data[0]);

      const newHeaders = columns.map((key) => ({
        Header: key.charAt(0).toUpperCase() + key.slice(1),
        accessor: key,
        sortable: true,
        visible:
          columnVisibility[key] !== undefined ? columnVisibility[key] : true,
      }));

      setHeaders(newHeaders);
    }
  }, [data, columnVisibility]);

  // Function to toggle column visibility
  const toggleColumnVisibility = (column) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [column]: !prevVisibility[column],
    }));
  };

  // Handle Sorting
  const handleSort = (column) => {
    let direction = "asc";
    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: column, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
      if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        rows,
        setRows,
        setRowsPerPage,
        rowsPerPage,
        headers,
        toggleColumnVisibility,
        handleSort,
        sortConfig
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataContextProvider");
  }
  return context;
};

export default DataContextProvider;
