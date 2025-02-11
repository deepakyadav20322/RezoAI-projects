import React, { useState } from "react";
import { useData } from "../context/DataContext";
import useOutsideClick from "../hooks/OutSideClick";

const ToggleColumn = () => {
  const { headers, toggleColumnVisibility } = useData();
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useOutsideClick(() => {
    [setIsOpen(false), setSearchTerm("")];
  });

  const filteredHeaders = headers.filter((header) =>
    header.Header.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleHeaderColumnSearch = (e) => {
    setSearchTerm(e.target.value);
    // when we outsideClick then search term should be empty
  };

  return (
    <>
      <div className="relative inline-block p-2 my-2">
        {/* Dropdown Button */}
        <div ref={dropdownRef} className="relative inline-block">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="border-2 border-gray-200 p-2 rounded bg-white"
          >
            Columns ▼
          </button>

          {/* Dropdown Content */}
          {isOpen && (
            <div className="absolute right-0 mt-2 min-w-96 w-full bg-white border border-gray-200 rounded shadow-lg z-10 px-2">
              <div className="flex justify-between p-2 border-b border-gray-200 items-center ">
                <h3>Toggle Columns</h3>

                {/* deselect all OR select all */}
                <div>
                  <span className="underline cursor-pointer">Select All</span>
                  {/* <button>Deselect All</button> */}
                </div>
              </div>
              <input
                onChange={handleHeaderColumnSearch}
                type="text"
                placeholder="Search..."
                className="px-2 py-1 border border-gray-300 rounded-lg w-full outline-none focus:outline-none my-2 text-[#1d283a]"
              />
              <div className="p-2">
                {filteredHeaders.map((header) => (
                  <label
                    key={header.accessor}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={header.visible}
                      onChange={() => toggleColumnVisibility(header.accessor)}
                    />
                    <span>{header.Header}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ToggleColumn;
