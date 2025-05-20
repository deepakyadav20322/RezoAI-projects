// import React from 'react'
// import ToggleColumn from './ToggleColumn'
// import PaginationBox from './PaginationBox'
// import FilterRowsONQueries from './FilterRowsONQueries'
// import { Hammer } from 'lucide-react'

// const TableCammandHeader = () => {
//   return (
//     <div className='flex items-center justify-between space-x-5 bg-white p-2 my-1  z-10'>
//       <div className='flex gap-x-2'>
//     <h2 className='text-xl font-semibold'><Hammer size={40} className='inline-block p-1 rounded-full border-black border-2'/> <span className='hidden md:inline-block'>Feature Enrich table</span></h2>
//     <div className='rounded-full border-black border-2  w-[2rem] h-[2rem] w-[10rem] transition-all duration-500 overflow-hidden hover:overflow-x-scroll scrollbar-hide '>http://localhost:300/api/asdf</div>
//     </div>
//     <div className='flex items-center space-x-12'>
//     <div className='flex space-x-5'>
//     <FilterRowsONQueries/>
//     <ToggleColumn/>
//     </div>
//     <div className="hidden md:block">
//     <PaginationBox/>
//     </div>
//     </div>
//     </div>
//   )
// }

// export default TableCammandHeader


import React, { useState,useRef, useEffect } from 'react'
import ToggleColumn from './ToggleColumn'
import PaginationBox from './PaginationBox'
import FilterRowsONQueries from './FilterRowsONQueries'
import { Hammer,Link } from 'lucide-react'
import { useData } from "../context/DataContext";
const TableCammandHeader = () => {

  const {url:globaleUrl,setUrl:setGlobalUrl,globalFormatError} = useData();
  const [url, setUrl] = useState(globaleUrl)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
         setGlobalUrl(url);
      inputRef.current?.blur()
    }
  }

   useEffect(() => {
    setUrl(globaleUrl);
  }, [globaleUrl]);

  const isExpanded = isHovered || isFocused

  return (
    <div className="flex items-center justify-between space-x-5 bg-white p-2 my-1 z-10">
      <div className="flex gap-x-2 items-center">
        <h2 className="text-xl font-semibold">
          <Hammer size={40} className="inline-block p-1 rounded-full border-black border-2" />
          <span className="hidden md:inline-block"> Feature Enrich table{globalFormatError.toString()}</span>
        </h2>

        <div
          className={`
            relative rounded-full border-black border-2 h-[2rem]
            ${isExpanded ? "w-[20rem]" : "w-[2rem] border-blue-600"}
            transition-all duration-500 ease-in-out overflow-hidden
            cursor-pointer
          `}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            if (!isFocused) setIsHovered(false)
          }}
          onClick={() => {
            if (!isFocused) {
              inputRef.current?.focus()
            }
          }}
        >
          {/* URL preview when collapsed */}
          <div
            className={`
              absolute inset-0 flex items-center justify-center
              ${isExpanded ? "opacity-0" : "opacity-100"}
              transition-opacity duration-300
            `}
          >
            <span className="text-xs font-medium"><Link size={16} /></span>
          </div>

          {/* Input field */}
          <input
            ref={inputRef}
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false)
              setIsHovered(false)
            }}
            onKeyDown={handleKeyDown}
            className={`
              w-full h-full bg-transparent outline-none px-3
              ${isExpanded ? "opacity-100" : "opacity-0"}
              transition-opacity duration-300
            `}
          />
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
