import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { X, ChevronsUpDown, ChevronLeft } from "lucide-react";
import { useData } from "../context/DataContext";
import useResizableTable from "../hooks/useResizeableTable";
import TableCommandHeader from "../components/TableCammandHeader";
import TableLoader from "../components/Tableloader";
import { motion, AnimatePresence } from "framer-motion";

const Tables = () => {
  const { rows, headers, handleSort, isloading } = useData();
  const initialWidths = [150, 150, 150, 150];
  const { columnWidths } = useResizableTable(initialWidths, 100, 800);

  const [modalStack, setModalStack] = useState([]);
  const [isTableView, setIsTableView] = useState(true);
  const tableRef = useRef(null);

  const openModal = (objectData, parentId, breadcrumb, columnName) => {
    setModalStack([
      ...modalStack,
      { objectData, parentId, breadcrumb, columnName },
    ]);
    setIsTableView(true);
  };

  const closeModal = () => {
    setModalStack(modalStack.slice(0, -1));
  };

  const closeAllModals = () => {
    setModalStack([]);
    setIsTableView(true);
  };

  const renderCellContent = (value, columnName) => {
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
          onClick={() => openModal(value, null, "Object", columnName)}
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
      <div className="bg-white shadow-lg border border-gray-400 p-6 h-full min-h-screen">
        <div className="sticky top-0 left-0 right-0 z-10 bg-white">
          <TableCommandHeader />
        </div>
        <div className="overflow-hidden border border-gray-400">
          <div ref={tableRef} className="overflow-auto min-h-[calc(100vh - 10rem)]">
            {isloading ? (
              <TableLoader />
            ) : (
              <table className="w-full border-collapse border border-gray-400 divide-y divide-gray-200">
                <thead className="bg-gray-100 sticky top-0 left-0 right-0">
                  <tr>
                    {headers.map((item, ind) =>
                      item.visible ? (
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
                      ) : null
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <AnimatePresence>
                    {rows && rows.length > 0 ? (
                      rows.map((item, rowIndex) => (
                        <motion.tr
                          key={rowIndex}
                          className="hover:bg-gray-50"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {headers.map((header, colIndex) =>
                            header.visible ? (
                              <motion.td
                                key={colIndex}
                                className="px-6 py-4 text-sm text-gray-500 border border-gray-300 max-w-64 truncate"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                              >
                                {renderCellContent(item[header.accessor], header.accessor)}
                              </motion.td>
                            ) : null
                          )}
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={headers.filter((header) => header.visible).length}
                          className="text-center py-4 text-medium text-gray-500"
                        >
                          No Data Available
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {modalStack && modalStack.length > 0 && (
        <div className="fixed inset-0 bg-white/90 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Details</h3>
                <button
                  onClick={closeAllModals}
                  className="text-red-400 hover:text-red-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Path: </span>
                  <span className="bg-amber-200/50 border-amber-600 border-[1px] text-amber-600 px-2 rounded-xl text-xs">
                    Root{" → "}
                    {modalStack.map((item, index) => (
                      <span key={index}>
                        {index > 0 && " → "} {item.columnName}
                      </span>
                    ))}
                  </span>
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
                          <td
                            key={key}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-[1px] border-gray-400"
                          >
                            {renderCellContent(value, key)}
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
