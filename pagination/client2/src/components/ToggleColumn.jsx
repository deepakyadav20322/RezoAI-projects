// import React, { useState } from "react";
// import { useData } from "../context/DataContext";
// import useOutsideClick from "../hooks/OutSideClick";

// const ToggleColumn = () => {
//   const { headers, toggleColumnVisibility } = useData();
//   const [isOpen, setIsOpen] = React.useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const dropdownRef = useOutsideClick(() => {
//     [setIsOpen(false), setSearchTerm("")];
//   });

//   const filteredHeaders = headers.filter((header) =>
//     header.Header.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleHeaderColumnSearch = (e) => {
//     setSearchTerm(e.target.value);
//     // when we outsideClick then search term should be empty
//   };

//   return (
//     <>
//       <div className="relative inline-block p-2 my-2">
//         {/* Dropdown Button */}
//         <div ref={dropdownRef} className="relative inline-block">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="border-2 border-gray-200 p-2 rounded bg-white"
//           >
//             Columns ▼
//           </button>

//           {/* Dropdown Content */}
//           {isOpen && (
//             <div className="absolute right-0 mt-2 min-w-96 w-full bg-white border border-gray-200 rounded shadow-lg z-10 px-2">
//               <div className="flex justify-between p-2 border-b border-gray-200 items-center ">
//                 <h3>Toggle Columns</h3>

//                 {/* deselect all OR select all */}
//                 <div>
//                   <span className="underline cursor-pointer">Select All</span>
//                   {/* <button>Deselect All</button> */}
//                 </div>
//               </div>
//               <input
//                 onChange={handleHeaderColumnSearch}
//                 type="text"
//                 placeholder="Search..."
//                 className="px-2 py-1 border border-gray-300 rounded-lg w-full outline-none focus:outline-none my-2 text-[#1d283a]"
//               />
//               <div className="p-2">
//                 {filteredHeaders.map((header) => (
//                   <label
//                     key={header.accessor}
//                     className="flex items-center space-x-2"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={header.visible}
//                       onChange={() => toggleColumnVisibility(header.accessor)}
//                     />
//                     <span>{header.Header}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ToggleColumn;




"use client"

import React, { useState } from "react"
import { useData } from "../context/DataContext"
import useOutsideClick from "../hooks/OutSideClick"
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react"

const ToggleColumn = () => {
  const { headers, toggleColumnVisibility } = useData()
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useOutsideClick(() => {
    setIsOpen(false)
    setSearchTerm("")
  })

  const filteredHeaders = headers.filter((header) => header.Header.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleHeaderColumnSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSelectAll = () => {
    headers.forEach((header) => {
      if (!header.visible) {
        toggleColumnVisibility(header.accessor)
      }
    })
  }

  const handleDeselectAll = () => {
    headers.forEach((header) => {
      if (header.visible) {
        toggleColumnVisibility(header.accessor)
      }
    })
  }

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <SlidersHorizontal className="w-4 h-4 mr-2" />
        Columns
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="p-3 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700">Toggle Columns</h3>
          </div>
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search columns..."
                value={searchTerm}
                onChange={handleHeaderColumnSearch}
                className="w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="p-3 max-h-60 overflow-y-auto">
            {filteredHeaders.map((header) => (
              <label
                key={header.accessor}
                className="flex items-center py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={header.visible}
                  onChange={() => toggleColumnVisibility(header.accessor)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-3 text-sm text-gray-700">{header.Header}</span>
              </label>
            ))}
          </div>
          <div className="p-3 border-t border-gray-200 bg-gray-50 flex justify-between">
            <button onClick={handleSelectAll} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
              Select All
            </button>
            <button onClick={handleDeselectAll} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
              Deselect All
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ToggleColumn

