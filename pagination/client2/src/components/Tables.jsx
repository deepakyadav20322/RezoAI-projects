import React, { useState } from "react";
import { X, ChevronsUpDown } from "lucide-react";
import { useData } from "../context/DataContext";
import  useResizableTable from "../hooks/useResizeableTable";
import usePagination from "../hooks/usePagination";
import TableCammandHeader from "./TableCammandHeader";
import { i } from "framer-motion/client";

// ✅ Helper function to format JSON nicely
const JsonCodeView = ({ data }) => (
  <pre className="bg-gray-100 border border-gray-300 p-3 rounded text-sm max-h-64 overflow-auto">
    {JSON.stringify(data, null, 2)}
  </pre>
);

const Tables = () => {
  const { data, rows, headers, handleSort, rowsPerPage } = useData();
  const initialWidths = [150, 150, 150, 150];
  const { columnWidths } = useResizableTable(initialWidths, 100, 800);
  const { paginatedRows } = usePagination(data, rowsPerPage);
  
  const [modalStack, setModalStack] = useState([]);
  const [isTableView, setIsTableView] = useState(true);

  // ✅ Open a modal for a nested object
  const openModal = (objectData, parentId, breadcrumb) => {
    setModalStack([...modalStack, { objectData, parentId, breadcrumb }]);
  };

  // ✅ Close the last modal (go back one level)
  const closeModal = () => {
    setModalStack(modalStack.slice(0, -1));
  };

  // ✅ Close all modals (exit view completely)
  const closeAllModals = () => {
    setModalStack([]);
  };

  return (
    <div className="container mt-5 text-center mx-auto w-full border-2 border-gray-200 p-5 overflow-x-auto relative">
      
      {/* Table Header */}
      <TableCammandHeader />

      {/* Main Table */}
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-700 border border-gray-600 divide-y divide-gray-200 rounded-sm py-4">
        <thead className="bg-black text-white uppercase">
          <tr>
            {headers.map((item, ind) => (
                item.visible && (
              <th
                key={item.accessor}
                className="border border-gray-400 px-4 py-2 cursor-pointer relative"
                style={{ width: columnWidths[ind] || 150 }}
                onClick={() => handleSort(item.accessor)}
              >
                <span className="flex justify-between items-center">
                  {item.Header} <ChevronsUpDown size={20} />
                </span>
              </th>
            )))}
          </tr>
        </thead>
        <tbody>
          {rows.map((item, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {headers.map((header, colIndex) =>
                header.visible && (
                  <td key={colIndex} className="border border-gray-300 px-4 py-2">
                    {typeof item[header.accessor] === "object" && item[header.accessor] !== null ? (
                      <button
                        onClick={() =>
                          openModal(item[header.accessor], item.id || null, `Row ${item.id}`)
                        }
                        // className="text-blue-500 underline cursor-pointer"
                       className="inline-flex items-center justify-center rounded-md bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 transition-all duration-200 ease-in-out shadow-[0rem_-1px_0rem_1px_#a1a7ad_inset,0rem_0rem_0rem_1px_#0000001a_inset,0rem_0.5px_0rem_1.5px_#f0f1f2_inset] hover:bg-gray-300 active:shadow-none focus:outline-none font-medium"
                      >
                        View Details
                      </button>
                    ) : (   
                        item[header.accessor]
                    )}
                        </td>
                ) 
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Popup Modal */}
      {modalStack.length > 0 && (
        <div className="fixed inset-0 flex items-start pt-30 justify-center bg-black bg-white/20 backdrop-blur-xl z-50">
          <div className="bg-white p-5 rounded-md shadow-lg w-2/3 relative">
            
            {/* Close-All Button */}
            <button
              onClick={closeAllModals}
              className="absolute top-3 right-3 text-red-600 text-xl"
            >
              <X size={24} />
            </button>

            <h3 className="text-lg font-semibold mb-3">Details</h3>

            {/* Breadcrumb Navigation */}
            <div className="mb-3 text-sm text-gray-600">
              <strong>Path:</strong>{" "}
              {modalStack.map((item, index) => (
                <span key={index}>
                  {index > 0 && " → "} {item.breadcrumb}
                </span>
              ))}
            </div>

            {/* Parent ID */}
            {modalStack[modalStack.length - 1].parentId && (
              <div className="mb-3 text-sm text-gray-600">
                <strong>Parent ID:</strong>{" "}
                {modalStack[modalStack.length - 1].parentId}
              </div>
            )}

            {/* ✅ Toggle Button */}
            <button
              onClick={() => setIsTableView(!isTableView)}
              className="mb-3 px-4 py-2 bg-gray-800 text-white rounded-md"
            >
              {isTableView ? "Switch to JSON View" : "Switch to Table View"}
            </button>

            {/* ✅ Conditional View Rendering */}
            {isTableView ? (
              <table className="w-full text-left border-collapse border border-gray-400 mb-4">
                <thead className="bg-gray-200">
                  <tr>
                    {Object.keys(modalStack[modalStack.length - 1].objectData).map(
                      (key) => (
                        <th key={key} className="border border-gray-300 px-4 py-2">
                          {key}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {Object.entries(modalStack[modalStack.length - 1].objectData).map(
                      ([key, value]) => (
                        <td key={key} className="border border-gray-300 px-4 py-2">
                          {typeof value === "object" && value !== null ? (
                            <button
                              onClick={() =>
                                openModal(
                                  value,
                                  modalStack[modalStack.length - 1].parentId,
                                  [
                                    modalStack[modalStack.length - 1].breadcrumb,
                                    key,
                                  ].join(" → ")
                                )
                              }
                            //   className="text-blue-500 underline cursor-pointer"
                            className="inline-flex items-center justify-center rounded-md bg-gray-300 text-gray-800 text-xs font-medium px-3 py-1 shadow-md transition-all duration-200 ease-in-out hover:shadow-md hover:bg-gray-200 active:shadow-inner active:bg-gray-400 focus:outline-none"
                            >
                              View Details
                            </button>
                          ) : (
                            value
                          )}
                        </td>
                      )
                    )}
                  </tr>
                </tbody>
              </table>
            ) : (
              <div className="bg-gray-100 border border-gray-300 rounded p-3 max-h-64 overflow-auto">
                <h4 className="text-xs font-bold mb-2">Object View (Code Format)</h4>
                <JsonCodeView data={modalStack[modalStack.length - 1].objectData} />
              </div>
            )}

            {/* Close Button */}
            <button
              className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tables;
