// // import React from 'react'
// // import ToggleColumn from './ToggleColumn'
// // import PaginationBox from './PaginationBox'
// // import FilterRowsONQueries from './FilterRowsONQueries'
// // import { Hammer } from 'lucide-react'

// // const TableCammandHeader = () => {
// //   return (
// //     <div className='flex items-center justify-between space-x-5 bg-white p-2 my-1  z-10'>
// //       <div className='flex gap-x-2'>
// //     <h2 className='text-xl font-semibold'><Hammer size={40} className='inline-block p-1 rounded-full border-black border-2'/> <span className='hidden md:inline-block'>Feature Enrich table</span></h2>
// //     <div className='rounded-full border-black border-2  w-[2rem] h-[2rem] w-[10rem] transition-all duration-500 overflow-hidden hover:overflow-x-scroll scrollbar-hide '>http://localhost:300/api/asdf</div>
// //     </div>
// //     <div className='flex items-center space-x-12'>
// //     <div className='flex space-x-5'>
// //     <FilterRowsONQueries/>
// //     <ToggleColumn/>
// //     </div>
// //     <div className="hidden md:block">
// //     <PaginationBox/>
// //     </div>
// //     </div>
// //     </div>
// //   )
// // }

// // export default TableCammandHeader


// import React, { useState,useRef, useEffect } from 'react'
// import ToggleColumn from './ToggleColumn'
// import PaginationBox from './PaginationBox'
// import FilterRowsONQueries from './FilterRowsONQueries'
// import { Hammer,Link } from 'lucide-react'
// import { useData } from "../context/DataContext";
// const TableCammandHeader = () => {

//   const {url:globaleUrl,setUrl:setGlobalUrl,globalFormatError} = useData();
//   const [url, setUrl] = useState(globaleUrl)
//   const [isHovered, setIsHovered] = useState(false)
//   const [isFocused, setIsFocused] = useState(false)
//   const inputRef = useRef(null)

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//          setGlobalUrl(url);
//       inputRef.current?.blur()
//     }
//   }

//    useEffect(() => {
//     setUrl(globaleUrl);
//   }, [globaleUrl]);

//   const isExpanded = isHovered || isFocused

//   return (
//     <div className="flex items-center justify-between space-x-5 bg-white p-2 my-1 z-10">
//       <div className="flex gap-x-2 items-center">
//         <h2 className="text-xl font-semibold gap-x-1">
//           <Hammer size={40} className="inline-block p-1 rounded-full border-black border-2" />
//           <span className="hidden md:inline-block"> Feature Enrich table{globalFormatError.toString()}</span>
//         </h2>

//         <div
//           className={`
//             relative rounded-full border-black border-2 h-[2rem]
//             ${isExpanded ? "w-[20rem]" : "w-[2rem] border-blue-600"}
//             transition-all duration-500 ease-in-out overflow-hidden
//             cursor-pointer
//           `}
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => {
//             if (!isFocused) setIsHovered(false)
//           }}
//           onClick={() => {
//             if (!isFocused) {
//               inputRef.current?.focus()
//             }
//           }}
//         >
//           {/* URL preview when collapsed */}
//           <div
//             className={`
//               absolute inset-0 flex items-center justify-center
//               ${isExpanded ? "opacity-0" : "opacity-100"}
//               transition-opacity duration-300
//             `}
//           >
//             <span className="text-xs font-medium"><Link size={16} /></span>
//           </div>

//           {/* Input field */}
//           <input
//             ref={inputRef}
//             type="text"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//             onFocus={() => setIsFocused(true)}
//             onBlur={() => {
//               setIsFocused(false)
//               setIsHovered(false)
//             }}
//             onKeyDown={handleKeyDown}
//             className={`
//               w-full h-full bg-transparent outline-none px-3
//               ${isExpanded ? "opacity-100" : "opacity-0"}
//               transition-opacity duration-300
//             `}
//           />
//         </div>
//       </div>

//       <div className="flex items-center space-x-4 md:space-x-12">
//         <div className="flex space-x-2 md:space-x-5">
//           <FilterRowsONQueries />
//           <ToggleColumn />
//         </div>
//         <div className="hidden md:block">
//           <PaginationBox />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default TableCammandHeader

// -----------------------------------------------------------

import React,{ useState, useRef, useEffect } from "react"
import ToggleColumn from "./ToggleColumn"
import PaginationBox from "./PaginationBox"
import FilterRowsONQueries from "./FilterRowsONQueries"
import { Hammer, Link } from "lucide-react"
import { useData } from "../context/DataContext"

const TableCammandHeader = () => {
  const { url: globaleUrl, setUrl: setGlobalUrl, globalFormatError } = useData()
  const [url, setUrl] = useState(globaleUrl)
  const [isExpanded, setIsExpanded] = useState(false)
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setGlobalUrl(url)
      handleClose()
    }
    if (e.key === "Escape") {
      setUrl(globaleUrl)
      handleClose()
    }
  }

  const handleOpen = () => {
    setIsExpanded(true)
    // Small delay to ensure the input is visible before focusing
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  const handleClose = () => {
    setIsExpanded(false)
    inputRef.current?.blur()
  }

  const handleContainerClick = (e) => {
    e.stopPropagation()
    if (!isExpanded) {
      handleOpen()
    }
  }

  const handleInputBlur = (e) => {
    // Check if the blur is happening because user clicked outside
    // Small delay to allow for any pending clicks
    setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        handleClose()
      }
    }, 100)
  }

  useEffect(() => {
    setUrl(globaleUrl)
  }, [globaleUrl])

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        handleClose()
      }
    }

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isExpanded])

  return (
    <div className="flex items-center justify-between space-x-5 bg-white p-2 my-1 z-10">
      <div className="flex gap-x-2 items-center">
        <h2 className="text-xl font-semibold">
          <Hammer size={40} className="inline-block p-1 rounded-full border-black border-2 mr-1" />
          <span className="hidden md:inline-block"> Feature Enrich table</span>
        </h2>

        <div
          ref={containerRef}
          className={`
            relative rounded-full border-2 h-[2.5rem] flex items-center
            ${isExpanded ? "w-[20rem] border-blue-500 bg-blue-50" : "w-[2.5rem] border-gray-400 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"}
            transition-all duration-300 ease-in-out overflow-hidden cursor-pointer
          `}
          onClick={handleContainerClick}
        >
          {/* Icon when collapsed */}
          <div
            className={`
              absolute left-0 top-0 h-full w-[2.5rem] flex items-center justify-center
              ${isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"}
              transition-opacity duration-200
            `}
          >
            <Link size={16} className="text-gray-600" />
          </div>

          {/* Input field */}
          <input
            ref={inputRef}
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            placeholder="Enter API endpoint URL..."
            className={`
              w-full h-full bg-transparent outline-none px-4 text-sm
              ${isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"}
              transition-opacity duration-200
            `}
          />

          {/* Close button when expanded */}
          {isExpanded && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleClose()
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
            >
              <span className="text-gray-500 text-lg leading-none">×</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-4 md:space-x-12">
        <div className="flex space-x-2 md:space-x-5">
          <FilterRowsONQueries />
          <ToggleColumn />
        </div>
        <div className="hidden md:block">
          <PaginationBox />
        </div>
      </div>
    </div>
  )
}

export default TableCammandHeader
