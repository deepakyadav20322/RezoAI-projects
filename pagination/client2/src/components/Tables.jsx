// // import React, { useState } from "react";
// // import { X, ChevronsUpDown } from "lucide-react";
// // import { useData } from "../context/DataContext";
// // import  useResizableTable from "../hooks/useResizeableTable";
// // import usePagination from "../hooks/usePagination";
// // import TableCammandHeader from "./TableCammandHeader";



// // const Tables = () => {
// //   const { rows, headers, handleSort } = useData();
// //   const initialWidths = [150, 150, 150, 150];
// //   const { columnWidths } = useResizableTable(initialWidths, 100, 800);
  
// //   // we use nested modals to show nested objects
// //   const [modalStack, setModalStack] = useState([]);
// //   const [isTableView, setIsTableView] = useState(true);

// //   // ✅ Open a modal for a nested object
// //   const openModal = (objectData, parentId, breadcrumb) => {
// //     setModalStack([...modalStack, { objectData, parentId, breadcrumb }]);
// //   };

// //   // ✅ Close the last modal (go back one level)
// //   const closeModal = () => {
// //     setModalStack(modalStack.slice(0, -1));
// //   };

// //   // ✅ Close all modals (exit view completely)
// //   const closeAllModals = () => {
// //     setModalStack([]);
// //   };

// //   return (
// //     <div className="container mt-5 text-center mx-auto w-full border-2 border-gray-200 p-5 overflow-x-auto relative">
      
// //       {/* Table Header */}
// //       <TableCammandHeader />

// //       {/* Main Table */}
// //       <table className="w-full border-collapse bg-white text-left text-sm text-gray-700 border border-gray-600 divide-y divide-gray-200 rounded-sm py-4">
// //         <thead className="bg-black text-white uppercase">
// //           <tr>
// //             {headers.map((item, ind) => (
// //                 item.visible && (
// //               <th
// //                 key={item.accessor}
// //                 className="border border-gray-400 px-4 py-2 cursor-pointer relative"
// //                 style={{ width: columnWidths[ind] || 150 }}
// //                 onClick={() => handleSort(item.accessor)}
// //               >
// //                 <span className="flex justify-between items-center">
// //                   {item.Header} <ChevronsUpDown size={20} />
// //                 </span>
// //               </th>
// //             )))}
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {rows.map((item, rowIndex) => (
// //             <tr key={rowIndex} className="hover:bg-gray-50">
// //               {headers.map((header, colIndex) =>
// //                 header.visible && (
// //                   <td key={colIndex} className="border border-gray-300 px-4 py-2">
// //                     {typeof item[header.accessor] === "object" && item[header.accessor] !== null ? (
// //                       <button
// //                         onClick={() =>
// //                           openModal(item[header.accessor], item.id || null, `Row ${item.id}`)
// //                         }
// //                         // className="text-blue-500 underline cursor-pointer"
// //                        className="inline-flex items-center justify-center rounded-md bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 transition-all duration-200 ease-in-out shadow-[0rem_-1px_0rem_1px_#a1a7ad_inset,0rem_0rem_0rem_1px_#0000001a_inset,0rem_0.5px_0rem_1.5px_#f0f1f2_inset] hover:bg-gray-300 active:shadow-none focus:outline-none"
// //                       >
// //                         View Details
// //                       </button>
// //                     ) : (   
// //                         item[header.accessor]
// //                     )}
// //                         </td>
// //                 ) 
// //               )}
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {/* ✅ Popup Modal */}
// //       {modalStack.length > 0 && (
// //         <div className="fixed inset-0 flex items-start pt-30 justify-cente bg-white/20 backdrop-blur-xl z-50">
// //           <div className="bg-white p-5 rounded-md shadow-lg w-2/3 relative">
            
// //             {/* Close-All Button */}
// //             <button
// //               onClick={closeAllModals}
// //               className="absolute top-3 right-3 text-red-600 text-xl"
// //             >
// //               <X size={24} />
// //             </button>

// //             <h3 className="text-lg font-semibold mb-3">Details</h3>

// //             {/* Breadcrumb Navigation */}
// //             <div className="mb-3 text-sm text-gray-600">
// //               <strong>Path:</strong>{" "}
// //               {modalStack.map((item, index) => (
// //                 <span key={index}>
// //                   {index > 0 && " → "} {item.breadcrumb}
// //                 </span>
// //               ))}
// //             </div>

// //             {/* Parent ID */}
// //             {modalStack[modalStack.length - 1].parentId && (
// //               <div className="mb-3 text-sm text-gray-600">
// //                 <strong>Parent ID:</strong>{" "}
// //                 {modalStack[modalStack.length - 1].parentId}
// //               </div>
// //             )}

// //             {/* ✅ Toggle Button */}
// //             <button
// //               onClick={() => setIsTableView(!isTableView)}
// //               className="mb-3 px-4 py-2 bg-gray-800 text-white rounded-md"
// //             >
// //               {isTableView ? "Switch to JSON View" : "Switch to Table View"}
// //             </button>

// //             {/* ✅ Conditional View Rendering */}
// //             {isTableView ? (
// //               <table className="w-full text-left border-collapse border border-gray-400 mb-4">
// //                 <thead className="bg-gray-200">
// //                   <tr>
// //                     {Object.keys(modalStack[modalStack.length - 1].objectData).map(
// //                       (key) => (
// //                         <th key={key} className="border border-gray-300 px-4 py-2">
// //                           {key}
// //                         </th>
// //                       )
// //                     )}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   <tr>
// //                     {Object.entries(modalStack[modalStack.length - 1].objectData).map(
// //                       ([key, value]) => (
// //                         <td key={key} className="border border-gray-300 px-4 py-2">
// //                           {typeof value === "object" && value !== null ? (
// //                             <button
// //                               onClick={() =>
// //                                 openModal(
// //                                   value,
// //                                   modalStack[modalStack.length - 1].parentId,
// //                                   [
// //                                     modalStack[modalStack.length - 1].breadcrumb,
// //                                     key,
// //                                   ].join(" → ")
// //                                 )
// //                               }
// //                             //   className="text-blue-500 underline cursor-pointer"
// //                             className="inline-flex items-center justify-center rounded-md bg-gray-300 text-gray-800 text-xs font-medium px-3 py-1 shadow-md transition-all duration-200 ease-in-out hover:shadow-md hover:bg-gray-200 active:shadow-inner active:bg-gray-400 focus:outline-none"
// //                             >
// //                               View Details
// //                             </button>
// //                           ) : (
// //                             value
// //                           )}
// //                         </td>
// //                       )
// //                     )}
// //                   </tr>
// //                 </tbody>
// //               </table>
// //             ) : (
// //               <div className="bg-gray-100 border border-gray-300 rounded p-3 max-h-64 overflow-auto">
// //                 <h4 className="text-xs font-bold mb-2">Object View (Code Format)</h4>
// //                 <JsonCodeView data={modalStack[modalStack.length - 1].objectData} />
// //               </div>
// //             )}

// //             {/* Close Button */}
// //             <button
// //               className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md"
// //               onClick={closeModal}
// //             >
// //               Close
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Tables;

// // // ✅ Helper function to format JSON nicely
// // const JsonCodeView = ({ data }) => (
// //   <pre className="bg-gray-100 border border-gray-300 p-3 rounded text-sm max-h-64 overflow-auto">
// //     {JSON.stringify(data, null, 2)}
// //   </pre>
// // );






// import React from "react"
// import { useState } from "react"
// import { X, ChevronsUpDown, ChevronLeft } from "lucide-react"
// import { useData } from "../context/DataContext"
// import useResizableTable from "../hooks/useResizeableTable"
// import TableCommandHeader from "../components/TableCammandHeader"

// const Tables = () => {
//   const { rows, headers, handleSort } = useData()
//   const initialWidths = [150, 150, 150, 150]
//   const { columnWidths } = useResizableTable(initialWidths, 100, 800)

//   const [modalStack, setModalStack] = useState([])
//   const [isTableView, setIsTableView] = useState(true)

//   const openModal = (objectData, parentId, breadcrumb) => {
//     setModalStack([...modalStack, { objectData, parentId, breadcrumb }])
//   }

//   const closeModal = () => {
//     setModalStack(modalStack.slice(0, -1))
//   }

//   const closeAllModals = () => {
//     setModalStack([])
//     setIsTableView(true)
//   }

//   return (
//     <div className=" mx-auto px-4 py-8">
//       <div className="bg-white shadow-lg rounded-lg  border border-gray-400 p-6 h-full min-h-screen">
//         <div className="sticky top-0 left-0 right-0 z-10 bg-white">
//         <TableCommandHeader />
//         </div>
//         <div className="overflow-auto border border-gray-400 rounded-lg">
//           <table className="w-full  border-collapse border border-gray-400 divide-y divide-gray-200 ">
//             <thead className="h-full overflow-auto">
//               <tr className="bg-gray-100 sticky top-0 left-0 right-0">
//                 {headers.map(
//                   (item, ind) =>
//                     item.visible && (
//                       <th
//                         key={item.accessor}
//                         className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer border border-gray-300"
//                         style={{ width: columnWidths[ind] || 150 }}
//                         onClick={() => handleSort(item.accessor)}
//                       >
//                         <div className="flex items-center space-x-1">
//                           <span>{item.Header}</span>
//                           <ChevronsUpDown className="w-4 h-4" />
//                         </div>
//                       </th>
//                     ),
//                 )}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {rows.map((item, rowIndex) => (
//                 <tr key={rowIndex} className="hover:bg-gray-50">
//                   {headers.map(
//                     (header, colIndex) =>
//                       header.visible && (
//                         <td key={colIndex} className="px-6 py-4  text-sm text-gray-500 border border-gray-300 max-w-64 truncate ">
//                           {typeof item[header.accessor] === "object" && item[header.accessor] !== null ? (
//                             <button
//                               onClick={() => openModal(item[header.accessor], item.id || null, `Row ${item.id}`)}
//                               className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                             >
//                               View Details
//                             </button>
//                           ) : (
//                             item[header.accessor]
//                           )}
//                         </td>
//                       ),
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {modalStack.length > 0 && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-medium text-gray-900">Details</h3>
//                 <button onClick={closeAllModals} className="text-red-400 hover:text-red-500">
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>

//               <div className="mb-4">
//                 <div className="text-sm text-gray-500">
//                   <span className="font-medium">Path: </span>
//                   {modalStack.map((item, index) => (
//                     <span key={index}>
//                       {index > 0 && " → "} {item.breadcrumb}
//                     </span>
//                   ))}
//                 </div>
//                 {modalStack[modalStack.length - 1].parentId && (
//                   <div className="text-sm text-gray-500">
//                     <span className="font-medium">Parent ID: </span>
//                     {modalStack[modalStack.length - 1].parentId}
//                   </div>
//                 )}
//               </div>

//               <div className="mb-4">
//                 <button
//                   onClick={() => setIsTableView(!isTableView)}
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   {isTableView ? "Switch to JSON View" : "Switch to Table View"}
//                 </button>
//               </div>

//               {isTableView ? (
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         {Object.keys(modalStack[modalStack.length - 1].objectData).map((key) => (
//                           <th
//                             key={key}
//                             className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                           >
//                             {key}
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       <tr>
//                         {Object.entries(modalStack[modalStack.length - 1].objectData).map(([key, value]) => (
//                           <td key={key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {typeof value === "object" && value !== null ? (
//                               <button
//                                 onClick={() =>
//                                   openModal(
//                                     value,
//                                     modalStack[modalStack.length - 1].parentId,
//                                     [modalStack[modalStack.length - 1].breadcrumb, key].join(" → "),
//                                   )
//                                 }
//                                 className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                               >
//                                 View Details
//                               </button>
//                             ) : (
//                               value
//                             )}
//                           </td>
//                         ))}
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               ) : (
//                 <div className="bg-gray-50 rounded-md p-4 overflow-auto max-h-96">
//                   <pre className="text-sm text-gray-700">
//                     {JSON.stringify(modalStack[modalStack.length - 1].objectData, null, 2)}
//                   </pre>
//                 </div>
//               )}

//               <div className="mt-6 flex justify-between">
//                 <button
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                   onClick={closeModal}
//                 >
//                   <ChevronLeft className="w-5 h-5 mr-1" />
//                   Back
//                 </button>
//                 <button
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                   onClick={closeAllModals}
//                 >
//                   Close All
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Tables









// ----------------------------------------------------------------------->



import React from "react";
import { useRef, useEffect } from "react";
import { useState } from "react";
import { X, ChevronsUpDown, ChevronLeft } from "lucide-react";
import { useData } from "../context/DataContext";
import useResizableTable from "../hooks/useResizeableTable";
import TableCommandHeader from "../components/TableCammandHeader";

const Tables = () => {
  const { rows, headers, handleSort } = useData();
  const initialWidths = [150, 150, 150, 150];
  const { columnWidths } = useResizableTable(initialWidths, 100, 800);

  const [modalStack, setModalStack] = useState([]);
  const [isTableView, setIsTableView] = useState(true);
  const tableRef = useRef(null);

  const openModal = (objectData, parentId, breadcrumb) => {
    setModalStack([...modalStack, { objectData, parentId, breadcrumb }]);
    setIsTableView(true);
  };

  const closeModal = () => {
    setModalStack(modalStack.slice(0, -1));
     
  };

  const closeAllModals = () => {
    setModalStack([]);
    setIsTableView(true);
  };

  const renderCellContent = (value) => {
    if (typeof value === "boolean") {
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {value.toString()}
        </span>
      );
    }
    if (typeof value === "object" && value !== null) {
      return (
        <button
          onClick={() => openModal(value, null, "Object")}
          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          View Details
        </button>
      );
    }
    return value;
  };

  return (
    <div className="mx-auto px-4 py-8">
      <div className="bg-white shadow-lg border border-gray-400 p-6 h-full min-h-screen ">
        <div className="sticky top-0 left-0 right-0 z-10 bg-white">
          <TableCommandHeader />
        </div>
        <div className="overflow-hidden border border-gray-400">
          <div ref={tableRef} className="overflow-auto min-h-[calc(100vh - 10rem)]">
            <table className="w-full border-collapse border border-gray-400 divide-y divide-gray-200">
              <thead className="bg-gray-100 sticky top-0 left-0 right-0">
                <tr>
                  {headers.map(
                    (item, ind) =>
                      item.visible && (
                        <th
                          key={item.accessor}
                          className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer border border-gray-300"
                          style={{ width: columnWidths[ind] || 150 }}
                          onClick={() => handleSort(item.accessor)}
                        >
                          <div className="flex items-center space-x-1">
                            <span>{item.Header}</span>
                            <ChevronsUpDown className="w-4 h-4" />
                          </div>
                        </th>
                      )
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rows.map((item, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    {headers.map(
                      (header, colIndex) =>
                        header.visible && (
                          <td
                            key={colIndex}
                            className="px-6 py-4 text-sm text-gray-500 border border-gray-300 max-w-64 truncate"
                          >
                            {renderCellContent(item[header.accessor])}
                          </td>
                        )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modalStack.length > 0 && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Details</h3>
                <button onClick={closeAllModals} className="text-red-400 hover:text-red-500">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Path: </span>
                  {modalStack.map((item, index) => (
                    <span key={index}>
                      {index > 0 && " → "} {item.breadcrumb}
                    </span>
                  ))}
                </div>
                {modalStack[modalStack.length - 1].parentId && (
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Parent ID: </span>
                    {modalStack[modalStack.length - 1].parentId}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <button
                  onClick={() => setIsTableView(!isTableView)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isTableView ? "Switch to JSON View" : "Switch to Table View"}
                </button>
              </div>

              {isTableView ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border-[1px] border-gray-300">
                    <thead className="bg-gray-200 border-[1px] border-gray-300">
                      <tr>
                        {Object.keys(modalStack[modalStack.length - 1].objectData).map((key) => (
                          <th
                            key={key}
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border-[1px] border-gray-400"
                          >
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        {Object.entries(modalStack[modalStack.length - 1].objectData).map(([key, value]) => (
                          <td key={key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-[1px] border-gray-400">
                            {renderCellContent(value)}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-md p-4 overflow-auto max-h-96">
                  <pre className="text-sm text-gray-700">
                    {JSON.stringify(modalStack[modalStack.length - 1].objectData, null, 2)}
                  </pre>
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={closeModal}
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  Back
                </button>
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={closeAllModals}
                >
                  Close All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tables;