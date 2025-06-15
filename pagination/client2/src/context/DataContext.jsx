// import { col } from "framer-motion/client";
// import React, { createContext, useContext, useState, useEffect } from "react";

// export const DataContext = createContext();

// const DataContextProvider = ({ children }) => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [columnVisibility, setColumnVisibility] = useState({});
//   const [headers, setHeaders] = useState([]);
//   const [isloading, setIsLoading] = useState(false);
//   const [rows, setRows] = useState([]);
//   const [rowsPerPage, setRowsPerPage] = useState(30);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

//   // Default URL state (you can set this dynamically)
//   const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/users");

//   //  State to track incorrect API data format
//   const [globalFormatError, setGlobalFormatError] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//         setGlobalFormatError({ isError: false, type: null, message: '' });
//            setData([]);
//     setRows([]);
//       try {
//           // Case 1: Empty URL
//     if (!url || url.trim() === '') {
//       throw new Error('URL cannot be empty');
//     }

//     // Case 2: Invalid URL format
//     try {
//       new URL(url); // This will throw for invalid URLs
//     } catch (e) {
//       throw new Error('Invalid URL format');
//     }

//         const response = await fetch(url);
//         // const data = await fetch("https://fakestoreapi.com/products");
      

//       // Case 3: Network errors
//     if (!response.ok) {
//       let message = `HTTP Error ${response.status}`;
//       if (response.status === 404) message = 'API endpoint not found (404)';
//       if (response.status === 500) message = 'Server error (500)';
//       throw new Error(message);
//     }

//       // Case 4: Invalid JSON
//     let data;
//     try {
//       data = await response.json();
//     } catch (e) {
//       throw new Error('Invalid JSON response');
//     }
         
//       // Case 5: Empty response
//     if (!data) {
//       throw new Error('Empty response from server');
//     }

//     // Case 6: Wrong data format
//     if (!Array.isArray(data)) {
//       throw new Error('Expected array data format');
//     }

//        // Case 7: Empty array
//     if (data.length === 0) {
//       throw new Error('API returned empty dataset');
//     }

//       // Case 8: Invalid object structure
//     if (typeof data[0] !== "object") {
//       throw new Error('Expected array of objects');
//     }

//         // // ✅ Check: response must be an array & first element must be object
//         // if (!Array.isArray(response) || typeof response[0] !== "object") {
//         //   setGlobalFormatError(true);
//         //   setData([]);
//         //   setRows([]);
//         //   return;
//         // }

//         console.log(response);

//       // Success case
//     setData(data);
//     setRows(data);
    

//         // setData(kake);
//         // setRows(kake);
//         // console.log(kake);

//         let defaultVisibility = {};
//         if (data.length > 0) {
//           const firstItem = data[0];
//           //  defaultVisibility = {};

//           for (let key in firstItem) {
//             defaultVisibility[key] = true;
//           }
//         }

//         setColumnVisibility(defaultVisibility);
//       } catch (error) {
//         console.log(error);
//           setGlobalFormatError({
//       isError: true,
//       type: error.name || 'API Error',
//       message: error.message,
//       url: url
//     });
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, [url]);

//   //   create table columns on besis of data
//   //   const columns = data.length > 0 ? Object.keys(data[0]) : [];

//   // Update headers when columnVisibility changes
//   useEffect(() => {
//     if (data.length > 0) {
//       const columns = Object.keys(data[0]);

//       const newHeaders = columns.map((key) => ({
//         Header: key.charAt(0).toUpperCase() + key.slice(1),
//         accessor: key,
//         sortable: true,
//         visible:
//           columnVisibility[key] !== undefined ? columnVisibility[key] : true,
//       }));
//       console.log("hare rama00", newHeaders);
//       console.log("hare rama11", columnVisibility);
//       setHeaders(newHeaders);
//     }
//   }, [data, columnVisibility]);

//   // Function to toggle column visibility
//   const toggleColumnVisibility = (column) => {
//     console.log("hare rama1", column);
//     console.log("hare rama2", columnVisibility);
//     setColumnVisibility((prevVisibility) => ({
//       ...prevVisibility,
//       [column]: !prevVisibility[column],
//     }));
//     console.log("hare rama3", columnVisibility);
//   };

//   // Handle Sorting
//   const handleSort = (column) => {
//     console.log(column);
//     let direction = "asc";
//     if (sortConfig.key === column && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key: column, direction });

//     const sortedData = [...data].sort((a, b) => {
//       if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
//       if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
//       return 0;
//     });

//     setData(sortedData);
//   };

//   return (
//     <DataContext.Provider
//       value={{
//         data,
//         setData,
//         rows,
//         setRows,
//         setRowsPerPage,
//         rowsPerPage,
//         headers,
//         toggleColumnVisibility,
//         handleSort,
//         sortConfig,
//         filteredData,
//         setFilteredData,
//         isloading,

//         url,
//         setUrl,
//         globalFormatError,
//         setGlobalFormatError,
//       }}
//     >
//       {children}
//     </DataContext.Provider>
//   );
// };

// export const useData = () => {
//   const context = useContext(DataContext);
//   if (!context) {
//     throw new Error("useData must be used within a DataContextProvider");
//   }
//   return context;
// };

// export default DataContextProvider;


// ------------------------------------------------- Version 2 test -----------------------------

import { col } from "framer-motion/client";
import React, { createContext, useContext, useState, useEffect } from "react";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [headers, setHeaders] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Default URL state
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/users");
  
  // NEW: Add data mode state (url or json)
  const [dataMode, setDataMode] = useState('url'); // 'url' or 'json'
  
  // NEW: Add raw JSON data state
  const [rawJsonData, setRawJsonData] = useState(null);

  // State to track incorrect API data format
  const [globalFormatError, setGlobalFormatError] = useState(false);

  // NEW: Modified useEffect to handle both modes
  useEffect(() => {
    const processData = (data) => {
      try {
        // Case 6: Wrong data format
        if (!Array.isArray(data)) {
          throw new Error('Expected array data format');
        }

        // Case 7: Empty array
        if (data.length === 0) {
          throw new Error('Empty dataset');
        }

        // Case 8: Invalid object structure
        if (typeof data[0] !== "object") {
          throw new Error('Expected array of objects');
        }

        setData(data);
        setRows(data);

        let defaultVisibility = {};
        if (data.length > 0) {
          const firstItem = data[0];
          for (let key in firstItem) {
            defaultVisibility[key] = true;
          }
        }

        setColumnVisibility(defaultVisibility);
        setGlobalFormatError(false);
      } catch (error) {
        setGlobalFormatError({
          isError: true,
          type: error.name || 'Data Error',
          message: error.message,
          source: dataMode === 'url' ? url : 'JSON input'
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (dataMode === 'url') {
      const fetchData = async () => {
        setIsLoading(true);
        setGlobalFormatError({ isError: false, type: null, message: '' });
        setData([]);
        setRows([]);
        
        try {
          // Case 1: Empty URL
          if (!url || url.trim() === '') {
            throw new Error('URL cannot be empty');
          }

          // Case 2: Invalid URL format
          try {
            new URL(url);
          } catch (e) {
            throw new Error('Invalid URL format');
          }

          const response = await fetch(url);

          // Case 3: Network errors
          if (!response.ok) {
            let message = `HTTP Error ${response.status}`;
            if (response.status === 404) message = 'API endpoint not found (404)';
            if (response.status === 500) message = 'Server error (500)';
            throw new Error(message);
          }

          // Case 4: Invalid JSON
          const data = await response.json();
          processData(data);
        } catch (error) {
          setGlobalFormatError({
            isError: true,
            type: error.name || 'API Error',
            message: error.message,
            url: url
          });
          setIsLoading(false);
        }
      };
      fetchData();
    } else if (dataMode === 'json' && rawJsonData) {
      setIsLoading(true);
      processData(rawJsonData);
    }
  }, [url, dataMode, rawJsonData]); // Add dataMode and rawJsonData to dependencies

  // Update headers when columnVisibility changes
  useEffect(() => {
    if (data.length > 0) {
      const columns = Object.keys(data[0]);
      const newHeaders = columns.map((key) => ({
        Header: key.charAt(0).toUpperCase() + key.slice(1),
        accessor: key,
        sortable: true,
        visible: columnVisibility[key] !== undefined ? columnVisibility[key] : true,
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
        sortConfig,
        filteredData,
        setFilteredData,
        isloading,
        url,
        setUrl,
        globalFormatError,
        setGlobalFormatError,
        // NEW: Add mode-related states
        dataMode,
        setDataMode,
        rawJsonData,
        setRawJsonData
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