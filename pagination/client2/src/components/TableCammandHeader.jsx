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



// import React,{ useState, useRef, useEffect } from "react"
// import ToggleColumn from "./ToggleColumn"
// import PaginationBox from "./PaginationBox"
// import FilterRowsONQueries from "./FilterRowsONQueries"
// import { Hammer, Link } from "lucide-react"
// import { useData } from "../context/DataContext"

// const TableCammandHeader = () => {
//   const { url: globaleUrl, setUrl: setGlobalUrl, globalFormatError } = useData()
//   const [url, setUrl] = useState(globaleUrl)
//   const [isExpanded, setIsExpanded] = useState(false)
//   const inputRef = useRef(null)
//   const containerRef = useRef(null)

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       setGlobalUrl(url)
//       handleClose()
//     }
//     if (e.key === "Escape") {
//       setUrl(globaleUrl)
//       handleClose()
//     }
//   }

//   const handleOpen = () => {
//     setIsExpanded(true)
//     // Small delay to ensure the input is visible before focusing
//     setTimeout(() => {
//       inputRef.current?.focus()
//     }, 100)
//   }

//   const handleClose = () => {
//     setIsExpanded(false)
//     inputRef.current?.blur()
//   }

//   const handleContainerClick = (e) => {
//     e.stopPropagation()
//     if (!isExpanded) {
//       handleOpen()
//     }
//   }

//   const handleInputBlur = (e) => {
//     // Check if the blur is happening because user clicked outside
//     // Small delay to allow for any pending clicks
//     setTimeout(() => {
//       if (!containerRef.current?.contains(document.activeElement)) {
//         handleClose()
//       }
//     }, 100)
//   }

//   useEffect(() => {
//     setUrl(globaleUrl)
//   }, [globaleUrl])

//   // Close on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (containerRef.current && !containerRef.current.contains(event.target)) {
//         handleClose()
//       }
//     }

//     if (isExpanded) {
//       document.addEventListener("mousedown", handleClickOutside)
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [isExpanded])

//   return (
//     <div className="flex items-center justify-between space-x-5 bg-white p-2 my-1 z-10">
//       <div className="flex gap-x-2 items-center">
//         <h2 className="text-xl font-semibold">
//           <Hammer size={40} className="inline-block p-1 rounded-full border-black border-2 mr-1" />
//           <span className="hidden md:inline-block"> Feature Enrich table</span>
//         </h2>

//         <div
//           ref={containerRef}
//           className={`
//             relative rounded-full border-2 h-[2.5rem] flex items-center
//             ${isExpanded ? "w-[20rem] border-blue-500 bg-blue-50" : "w-[2.5rem] border-gray-400 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"}
//             transition-all duration-300 ease-in-out overflow-hidden cursor-pointer
//           `}
//           onClick={handleContainerClick}
//         >
//           {/* Icon when collapsed */}
//           <div
//             className={`
//               absolute left-0 top-0 h-full w-[2.5rem] flex items-center justify-center
//               ${isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"}
//               transition-opacity duration-200
//             `}
//           >
//             <Link size={16} className="text-gray-600" />
//           </div>

//           {/* Input field */}
//           <input
//             ref={inputRef}
//             type="text"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//             onBlur={handleInputBlur}
//             onKeyDown={handleKeyDown}
//             placeholder="Enter API endpoint URL..."
//             className={`
//               w-full h-full bg-transparent outline-none px-4 text-sm
//               ${isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"}
//               transition-opacity duration-200
//             `}
//           />

//           {/* Close button when expanded */}
//           {isExpanded && (
//             <button
//               onClick={(e) => {
//                 e.stopPropagation()
//                 handleClose()
//               }}
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
//             >
//               <span className="text-gray-500 text-lg leading-none">×</span>
//             </button>
//           )}
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




// ----------------------- deepseek version ----------------------------(15/06/2025)-------

// import React, { useState, useRef, useEffect } from "react"
// import ToggleColumn from "./ToggleColumn"
// import PaginationBox from "./PaginationBox"
// import FilterRowsONQueries from "./FilterRowsONQueries"
// import { Hammer, Link, Code, Globe } from "lucide-react"
// import { useData } from "../context/DataContext"

// const TableCommandHeader = () => {
//   const { 
//     url: globaleUrl, 
//     setUrl: setGlobalUrl, 
//     globalFormatError,
//     dataMode,
//     setDataMode,
//     rawJsonData,
//     setRawJsonData
//   } = useData()
  
//   const [url, setUrl] = useState(globaleUrl)
//   const [jsonInput, setJsonInput] = useState(JSON.stringify(rawJsonData || [], null, 2))
//   const [isExpanded, setIsExpanded] = useState(false)
//   const [activeInput, setActiveInput] = useState(null) // 'url' or 'json'
//   const inputRef = useRef(null)
//   const containerRef = useRef(null)

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       if (activeInput === 'url') {
//         setGlobalUrl(url)
//       } else if (activeInput === 'json') {
//         try {
//           const parsedData = JSON.parse(jsonInput)
//           setRawJsonData(parsedData)
//         } catch (error) {
//           console.error("Invalid JSON:", error)
//           // You might want to show an error to the user here
//         }
//       }
//       handleClose()
//     }
//     if (e.key === "Escape") {
//       handleClose()
//     }
//   }

//   const handleOpen = (inputType) => {
//     setActiveInput(inputType)
//     setIsExpanded(true)
//     setTimeout(() => {
//       inputRef.current?.focus()
//     }, 100)
//   }

//   const handleClose = () => {
//     setIsExpanded(false)
//     setActiveInput(null)
//     inputRef.current?.blur()
//   }

//   const handleContainerClick = (e) => {
//     e.stopPropagation()
//     if (!isExpanded) {
//       handleOpen(dataMode === 'url' ? 'url' : 'json')
//     }
//   }

//   const handleInputBlur = (e) => {
//     setTimeout(() => {
//       if (!containerRef.current?.contains(document.activeElement)) {
//         handleClose()
//       }
//     }, 100)
//   }

//   const toggleDataMode = () => {
//     const newMode = dataMode === 'url' ? 'json' : 'url'
//     setDataMode(newMode)
//     if (newMode === 'url') {
//       setUrl(globaleUrl)
//     } else {
//       setJsonInput(JSON.stringify(rawJsonData || [], null, 2))
//     }
//     handleClose()
//   }

//   useEffect(() => {
//     if (dataMode === 'url') {
//       setUrl(globaleUrl)
//     }
//   }, [globaleUrl, dataMode])

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (containerRef.current && !containerRef.current.contains(event.target)) {
//         handleClose()
//       }
//     }

//     if (isExpanded) {
//       document.addEventListener("mousedown", handleClickOutside)
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [isExpanded])

//   return (
//     <div className="flex items-center justify-between space-x-5 bg-white p-2 my-1 z-10">
//       <div className="flex gap-x-2 items-center">
//         <h2 className="text-xl font-semibold">
//           <Hammer size={40} className="inline-block p-1 rounded-full border-black border-2 mr-1" />
//           <span className="hidden md:inline-block"> Feature Enrich table</span>
//         </h2>

//         <div className="flex items-center gap-x-2">
//           {/* Mode toggle button */}
//           <button
//             onClick={toggleDataMode}
//             className={`p-2 rounded-full border-2 ${
//               dataMode === 'url' 
//                 ? 'bg-blue-100 border-blue-500 text-blue-600' 
//                 : 'bg-purple-100 border-purple-500 text-purple-600'
//             } transition-colors`}
//             title={`Switch to ${dataMode === 'url' ? 'JSON' : 'URL'} mode`}
//           >
//             {dataMode === 'url' ? <Globe size={16} /> : <Code size={16} />}
//           </button>

//           {/* Input container */}
//           <div
//             ref={containerRef}
//             className={`
//               relative rounded-full border-2 h-[2.5rem] flex items-center
//               ${isExpanded ? 
//                 `w-[20rem] ${dataMode === 'url' ? 'border-blue-500 bg-blue-50' : 'border-purple-500 bg-purple-50'}` 
//                 : `w-[2.5rem] border-gray-400 bg-gray-50 hover:${dataMode === 'url' ? 'border-blue-400 bg-blue-50' : 'border-purple-400 bg-purple-50'}`}
//               transition-all duration-300 ease-in-out overflow-hidden cursor-pointer
//             `}
//             onClick={handleContainerClick}
//           >
//             {/* Icon when collapsed */}
//             <div
//               className={`
//                 absolute left-0 top-0 h-full w-[2.5rem] flex items-center justify-center
//                 ${isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"}
//                 transition-opacity duration-200
//               `}
//             >
//               {dataMode === 'url' ? 
//                 <Link size={16} className="text-gray-600" /> : 
//                 <Code size={16} className="text-gray-600" />
//               }
//             </div>

//             {/* URL input field */}
//             {activeInput === 'url' && (
//               <input
//                 ref={inputRef}
//                 type="text"
//                 value={url}
//                 onChange={(e) => setUrl(e.target.value)}
//                 onBlur={handleInputBlur}
//                 onKeyDown={handleKeyDown}
//                 placeholder="Enter API endpoint URL..."
//                 className={`
//                   w-full h-full bg-transparent outline-none px-4 text-sm
//                   ${isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"}
//                   transition-opacity duration-200
//                 `}
//               />
//             )}

//             {/* JSON input field */}
//             {activeInput === 'json' && (
//               <textarea
//                 ref={inputRef}
//                 value={jsonInput}
//                 onChange={(e) => setJsonInput(e.target.value)}
//                 onBlur={handleInputBlur}
//                 onKeyDown={handleKeyDown}
//                 placeholder="Paste your JSON array here..."
//                 className={`
//                   w-full h-full bg-transparent outline-none px-4 text-sm
//                   ${isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"}
//                   transition-opacity duration-200 py-2 resize-none
//                 `}
//                 rows={1}
//               />
//             )}

//             {/* Close button when expanded */}
//             {isExpanded && (
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   handleClose()
//                 }}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
//               >
//                 <span className="text-gray-500 text-lg leading-none">×</span>
//               </button>
//             )}
//           </div>
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


import React, { useState, useRef, useEffect } from "react"
import ToggleColumn from "./ToggleColumn"
import PaginationBox from "./PaginationBox"
import FilterRowsONQueries from "./FilterRowsONQueries"
import { Hammer, Link, Code, Globe, X, Check, AlertCircle, Zap } from "lucide-react"
import { useData } from "../context/DataContext"

const TableCommandHeader = () => {
  // ===== CONTEXT AND STATE =====
  const {
    url: globaleUrl,
    setUrl: setGlobalUrl,
    globalFormatError,
    dataMode,
    setDataMode,
    rawJsonData,
    setRawJsonData,
  } = useData()

  // URL-related state
  const [url, setUrl] = useState(globaleUrl)
  const [isUrlExpanded, setIsUrlExpanded] = useState(false)

  // JSON-related state
  const [jsonInput, setJsonInput] = useState(JSON.stringify(rawJsonData || [], null, 2))
  const [isJsonPopupOpen, setIsJsonPopupOpen] = useState(false)
  const [jsonError, setJsonError] = useState("")
  const [errorLineNumber, setErrorLineNumber] = useState(null)
  const [autoWrapMessage, setAutoWrapMessage] = useState("")

  // Refs for DOM manipulation
  const urlInputRef = useRef(null)
  const jsonTextareaRef = useRef(null)
  const lineNumbersRef = useRef(null)
  const urlContainerRef = useRef(null)

  // ===== VALIDATION FUNCTIONS =====

  /**
   * Gets the type of a value with more specific categorization
   */
  const getValueType = (value) => {
    if (value === null) return "null"
    if (Array.isArray(value)) return "array"
    if (typeof value === "object") return "object"
    if (typeof value === "string") return "string"
    if (typeof value === "number") return "number"
    if (typeof value === "boolean") return "boolean"
    return typeof value
  }

  /**
   * Validates nested object structure recursively
   */
  const validateNestedObjectStructure = (referenceObj, currentObj, propertyPath, objectIndex) => {
    const referenceKeys = Object.keys(referenceObj).sort()
    const currentKeys = Object.keys(currentObj).sort()

    // Check for missing keys in nested object
    const missingKeys = referenceKeys.filter((key) => !currentKeys.includes(key))
    if (missingKeys.length > 0) {
      return {
        isValid: false,
        error: `Nested object "${propertyPath}" in object at position ${objectIndex} is missing properties: ${missingKeys.join(", ")}.\n\nExpected nested structure: ${JSON.stringify(referenceObj, null, 2)}\nActual nested structure: ${JSON.stringify(currentObj, null, 2)}\n\nNested objects must have consistent structure.`,
      }
    }

    // Check for extra keys in nested object
    const extraKeys = currentKeys.filter((key) => !referenceKeys.includes(key))
    if (extraKeys.length > 0) {
      return {
        isValid: false,
        error: `Nested object "${propertyPath}" in object at position ${objectIndex} has unexpected properties: ${extraKeys.join(", ")}.\n\nExpected nested structure: ${JSON.stringify(referenceObj, null, 2)}\nActual nested structure: ${JSON.stringify(currentObj, null, 2)}\n\nNested objects must have consistent structure.`,
      }
    }

    // Check data types in nested object
    for (const key of referenceKeys) {
      const referenceType = getValueType(referenceObj[key])
      const currentType = getValueType(currentObj[key])

      if (referenceType !== currentType) {
        return {
          isValid: false,
          error: `Property "${propertyPath}.${key}" has inconsistent data type in object at position ${objectIndex}.\n\nExpected type: ${referenceType}\nActual type: ${currentType}\n\nReference value: ${JSON.stringify(referenceObj[key])}\nCurrent value: ${JSON.stringify(currentObj[key])}\n\nNested properties must have consistent data types.`,
        }
      }

      // Recursively check deeper nested objects
      if (referenceType === "object" && currentType === "object") {
        const deeperValidation = validateNestedObjectStructure(
          referenceObj[key],
          currentObj[key],
          `${propertyPath}.${key}`,
          objectIndex,
        )
        if (!deeperValidation.isValid) {
          return deeperValidation
        }
      }
    }

    return { isValid: true, error: "" }
  }

  /**
   * Validates structural consistency across all objects in the array
   */
  const validateStructuralConsistency = (data) => {
    if (data.length <= 1) {
      return { isValid: true, error: "" }
    }

    // Get the structure of the first object as reference
    const referenceObject = data[0]
    const referenceKeys = Object.keys(referenceObject).sort()

    // Check each subsequent object against the reference
    for (let i = 1; i < data.length; i++) {
      const currentObject = data[i]
      const currentKeys = Object.keys(currentObject).sort()

      // Check if keys match
      const missingKeys = referenceKeys.filter((key) => !currentKeys.includes(key))
      const extraKeys = currentKeys.filter((key) => !referenceKeys.includes(key))

      if (missingKeys.length > 0) {
        return {
          isValid: false,
          error: `Object at position ${i + 1} is missing required properties: ${missingKeys.join(", ")}.\n\n📋 Expected properties: ${referenceKeys.join(", ")}\n📋 Actual properties: ${currentKeys.join(", ")}\n\n💡 All objects must have the same top-level structure as the first object.\n\n🔍 Reference object (first object):\n${JSON.stringify(referenceObject, null, 2)}\n\n❌ Current object (position ${i + 1}):\n${JSON.stringify(currentObject, null, 2)}`,
        }
      }

      if (extraKeys.length > 0) {
        return {
          isValid: false,
          error: `Object at position ${i + 1} has unexpected properties: ${extraKeys.join(", ")}.\n\n📋 Expected properties: ${referenceKeys.join(", ")}\n📋 Actual properties: ${currentKeys.join(", ")}\n\n💡 All objects must have the same top-level structure as the first object.\n\n🔍 Reference object (first object):\n${JSON.stringify(referenceObject, null, 2)}\n\n❌ Current object (position ${i + 1}):\n${JSON.stringify(currentObject, null, 2)}`,
        }
      }

      // Check data types for each property
      for (const key of referenceKeys) {
        const referenceType = getValueType(referenceObject[key])
        const currentType = getValueType(currentObject[key])

        if (referenceType !== currentType) {
          return {
            isValid: false,
            error: `Property "${key}" has inconsistent data type in object at position ${i + 1}.\n\n📊 Expected type: ${referenceType}\n📊 Actual type: ${currentType}\n\n🔍 Reference value: ${JSON.stringify(referenceObject[key])}\n❌ Current value: ${JSON.stringify(currentObject[key])}\n\n💡 All objects must have consistent data types for the same properties.`,
          }
        }

        // For nested objects, check structure recursively
        if (referenceType === "object" && currentType === "object") {
          const nestedValidation = validateNestedObjectStructure(
            referenceObject[key],
            currentObject[key],
            `${key}`,
            i + 1,
          )
          if (!nestedValidation.isValid) {
            return nestedValidation
          }
        }
      }
    }

    return { isValid: true, error: "" }
  }

  /**
   * Validates if the provided data is an array of objects with consistent structure
   */
  const validateArrayOfObjects = (data) => {
    // Check if it's an array
    if (!Array.isArray(data)) {
      if (typeof data === "object" && data !== null) {
        return {
          isValid: false,
          error:
            "Expected an array, but received a single object. Please wrap your object in square brackets: [{ ... }]",
        }
      }
      return {
        isValid: false,
        error: `Expected an array, but received ${typeof data}. Please provide data in array format: [{ ... }]`,
      }
    }

    // Check if array is empty
    if (data.length === 0) {
      return {
        isValid: false,
        error: "The array is empty. Please provide at least one object in the array.",
      }
    }

    // Validate each item in the array
    for (let i = 0; i < data.length; i++) {
      const item = data[i]

      if (item === null) {
        return {
          isValid: false,
          error: `Item at position ${i + 1} is null. Each array item must be a valid object.`,
        }
      }

      if (Array.isArray(item)) {
        return {
          isValid: false,
          error: `Item at position ${i + 1} is an array. Each array item must be an object, not a nested array.`,
        }
      }

      if (typeof item !== "object") {
        return {
          isValid: false,
          error: `Item at position ${i + 1} is of type "${typeof item}". Each array item must be an object with key-value pairs.`,
        }
      }

      // Check if object has at least one property
      if (Object.keys(item).length === 0) {
        return {
          isValid: false,
          error: `Item at position ${i + 1} is an empty object. Each object should have at least one property.`,
        }
      }
    }

    // Check for structural consistency across all objects
    const structureValidation = validateStructuralConsistency(data)
    if (!structureValidation.isValid) {
      return structureValidation
    }

    return { isValid: true, error: "" }
  }

  /**
   * Enhanced JSON parsing with better error detection
   */
  const parseJsonSafely = (jsonText) => {
    try {
      const parsed = JSON.parse(jsonText)
      return { success: true, data: parsed, error: null }
    } catch (error) {
      // Check for common incomplete JSON patterns
      const trimmed = jsonText.trim()

      // Check if JSON appears to be cut off
      if (trimmed.endsWith(",") || trimmed.endsWith("{") || trimmed.endsWith("[")) {
        return {
          success: false,
          data: null,
          error: {
            type: "incomplete",
            message:
              "JSON appears to be incomplete or cut off. Please ensure all objects and arrays are properly closed.",
            suggestion: "Check that all opening brackets { [ have matching closing brackets } ]",
          },
        }
      }

      // Check for unmatched brackets
      const openBraces = (trimmed.match(/\{/g) || []).length
      const closeBraces = (trimmed.match(/\}/g) || []).length
      const openBrackets = (trimmed.match(/\[/g) || []).length
      const closeBrackets = (trimmed.match(/\]/g) || []).length

      if (openBraces !== closeBraces) {
        return {
          success: false,
          data: null,
          error: {
            type: "unmatched_braces",
            message: `Unmatched braces: ${openBraces} opening { but ${closeBraces} closing }`,
            suggestion: "Ensure every opening brace { has a matching closing brace }",
          },
        }
      }

      if (openBrackets !== closeBrackets) {
        return {
          success: false,
          data: null,
          error: {
            type: "unmatched_brackets",
            message: `Unmatched brackets: ${openBrackets} opening [ but ${closeBrackets} closing ]`,
            suggestion: "Ensure every opening bracket [ has a matching closing bracket ]",
          },
        }
      }

      // Return original error for other cases
      return {
        success: false,
        data: null,
        error: {
          type: "syntax",
          message: error.message,
          suggestion: "Check JSON syntax for missing commas, quotes, or other formatting issues",
        },
      }
    }
  }

  /**
   * Auto-wraps objects in array brackets if needed - FIXED to handle nested objects properly
   */
  const autoWrapObjects = (jsonText) => {
    const trimmed = jsonText.trim()
    if (!trimmed) {
      return {
        result: trimmed,
        wasWrapped: false,
        message: "Input is empty",
      }
    }

    // Check if it already starts with [ and ends with ]
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        // Verify it's valid JSON array
        const parsed = JSON.parse(trimmed)
        if (Array.isArray(parsed)) {
          return {
            result: trimmed,
            wasWrapped: false,
            message: "Already a valid array",
          }
        }
      } catch (e) {
        // If it starts with [ but isn't valid, we'll try to fix it below
      }
    }

    // Check if it has partial brackets (common copy-paste errors)
    const hasOpeningBracket = trimmed.startsWith("[")
    const hasClosingBracket = trimmed.endsWith("]")

    if (hasOpeningBracket && !hasClosingBracket) {
      // Missing closing bracket
      const withClosing = trimmed + "]"
      try {
        const parsed = JSON.parse(withClosing)
        if (Array.isArray(parsed)) {
          return {
            result: withClosing,
            wasWrapped: true,
            message: "Added missing closing bracket ]",
          }
        }
      } catch (e) {
        // Continue to other checks
      }
    }

    if (!hasOpeningBracket && hasClosingBracket) {
      // Missing opening bracket
      const withOpening = "[" + trimmed
      try {
        const parsed = JSON.parse(withOpening)
        if (Array.isArray(parsed)) {
          return {
            result: withOpening,
            wasWrapped: true,
            message: "Added missing opening bracket [",
          }
        }
      } catch (e) {
        // Continue to other checks
      }
    }

    try {
      // Try to parse as-is first
      const parsed = JSON.parse(trimmed)

      // If it's already an array, return as-is
      if (Array.isArray(parsed)) {
        return {
          result: trimmed,
          wasWrapped: false,
          message: "Already a valid array",
        }
      }

      // If it's a single object (including nested objects), wrap it in an array
      if (typeof parsed === "object" && parsed !== null) {
        const wrapped = `[${trimmed}]`
        return {
          result: wrapped,
          wasWrapped: true,
          message: "Wrapped single object in array brackets",
        }
      }

      // If it's a primitive value, wrap it
      const wrapped = `[${trimmed}]`
      return {
        result: wrapped,
        wasWrapped: true,
        message: "Wrapped value in array brackets",
      }
    } catch (error) {
      // If parsing fails, try to detect and fix common patterns

      // Pattern 1: Single complete object (including nested) - MOST COMMON CASE
      if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
        // Try to wrap the entire object as-is
        const wrapped = `[${trimmed}]`
        try {
          const parsed = JSON.parse(wrapped)
          if (Array.isArray(parsed) && parsed.length === 1) {
            return {
              result: wrapped,
              wasWrapped: true,
              message: "Wrapped single object (with nested structure) in array brackets",
            }
          }
        } catch (e) {
          // If wrapping fails, the JSON itself is malformed
          return {
            result: trimmed,
            wasWrapped: false,
            message: "Object appears malformed - please check JSON syntax",
          }
        }
      }

      // Pattern 2: Multiple complete objects separated by commas (common mistake)
      // Example: {"id":1,"name":"John"},{"id":2,"name":"Jane"}
      // This is different from nested objects - these are separate root-level objects
      if (trimmed.includes("},{") && !trimmed.startsWith("[")) {
        // Count the number of complete objects by counting },{ patterns + 1
        const objectSeparators = (trimmed.match(/\},\s*\{/g) || []).length
        const expectedObjects = objectSeparators + 1

        const wrapped = `[${trimmed}]`
        try {
          const parsed = JSON.parse(wrapped)
          if (Array.isArray(parsed) && parsed.length === expectedObjects) {
            return {
              result: wrapped,
              wasWrapped: true,
              message: `Wrapped ${expectedObjects} separate objects in array brackets`,
            }
          }
        } catch (e) {
          // If this fails, it might be nested objects, not separate objects
          return {
            result: trimmed,
            wasWrapped: false,
            message: "Could not parse - please check JSON syntax",
          }
        }
      }

      // Pattern 3: Try wrapping anyway, but be more conservative
      if (!trimmed.startsWith("[") && !trimmed.endsWith("]")) {
        const wrapped = `[${trimmed}]`
        return {
          result: wrapped,
          wasWrapped: true,
          message: "Attempted to wrap in array brackets (may need manual fixing)",
        }
      }

      // If all else fails, return original
      return {
        result: trimmed,
        wasWrapped: false,
        message: "Could not auto-wrap - manual fixing required",
      }
    }
  }

  /**
   * Parses JSON error messages and provides user-friendly guidance with location context
   */
  const parseJsonError = (errorMessage, jsonText) => {
    // Extract position information from error message
    const positionMatch = errorMessage.match(/at position (\d+)/)
    let userFriendlyMessage = ""
    let lineNumber = null

    // If we have position information, provide context
    if (positionMatch) {
      const position = Number.parseInt(positionMatch[1])
      const lines = jsonText.substring(0, position).split("\n")
      lineNumber = lines.length
      const columnNumber = lines[lines.length - 1].length + 1
      const errorLine = jsonText.split("\n")[lineNumber - 1] || ""

      userFriendlyMessage += `🎯 Error found at Line ${lineNumber}, Column ${columnNumber}`

      if (errorLine.trim()) {
        userFriendlyMessage += `\n\n📝 Problematic line:\n"${errorLine.trim()}"`
      }

      // Get surrounding context (1 line before and after)
      const allLines = jsonText.split("\n")
      const contextStart = Math.max(0, lineNumber - 2)
      const contextEnd = Math.min(allLines.length, lineNumber + 1)
      const contextLines = allLines.slice(contextStart, contextEnd)

      if (contextLines.length > 1) {
        userFriendlyMessage += `\n\n📋 Context around the error:`
        contextLines.forEach((line, index) => {
          const actualLineNum = contextStart + index + 1
          const marker = actualLineNum === lineNumber ? "❌ " : "   "
          userFriendlyMessage += `\n${marker}${actualLineNum}: ${line}`
        })
      }
    } else {
      userFriendlyMessage = "❌ JSON format error detected"
    }

    // Add specific guidance based on error type
    if (errorMessage.includes("Unexpected token")) {
      if (errorMessage.includes("'}'")) {
        userFriendlyMessage += "\n\n💡 Likely issue: Missing comma before this closing brace"
      } else if (errorMessage.includes("','")) {
        userFriendlyMessage += "\n\n💡 Likely issue: Extra comma (remove the trailing comma)"
      } else if (errorMessage.includes("'\"'")) {
        userFriendlyMessage += "\n\n💡 Likely issue: Unescaped quote or missing comma"
      } else {
        userFriendlyMessage += "\n\n💡 Likely issue: Missing comma, quote, or bracket"
      }
    } else if (errorMessage.includes("Unexpected end")) {
      userFriendlyMessage += "\n\n💡 Likely issue: Missing closing bracket ] or brace }"
    } else if (errorMessage.includes("Expected")) {
      userFriendlyMessage += "\n\n💡 Likely issue: Incorrect JSON structure or syntax"
    }

    return { message: userFriendlyMessage, lineNumber }
  }

  /**
   * Jumps to the error line in the textarea
   */
  const jumpToErrorLine = () => {
    if (!errorLineNumber || !jsonTextareaRef.current) return

    const textarea = jsonTextareaRef.current
    const lines = textarea.value.split("\n")

    // Calculate the start position of the error line
    let startPosition = 0
    for (let i = 0; i < errorLineNumber - 1 && i < lines.length; i++) {
      startPosition += lines[i].length + 1 // +1 for newline character
    }

    // Calculate end position (end of the error line)
    const errorLineLength = lines[errorLineNumber - 1]?.length || 0
    const endPosition = startPosition + errorLineLength

    // Focus and select the error line
    textarea.focus()
    textarea.setSelectionRange(startPosition, endPosition)

    // Scroll to make the line visible
    const lineHeight = 20 // Approximate line height in pixels
    const scrollTop = Math.max(0, (errorLineNumber - 3) * lineHeight)
    textarea.scrollTop = scrollTop

    // Also sync the line numbers
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = scrollTop
    }
  }

  // ===== URL HANDLING FUNCTIONS =====

  const handleUrlKeyDown = (e) => {
    if (e.key === "Enter") {
      setGlobalUrl(url)
      handleUrlClose()
    }
    if (e.key === "Escape") {
      handleUrlClose()
    }
  }

  const handleUrlOpen = () => {
    setIsUrlExpanded(true)
    setTimeout(() => {
      urlInputRef.current?.focus()
    }, 100)
  }

  const handleUrlClose = () => {
    setIsUrlExpanded(false)
    urlInputRef.current?.blur()
  }

  const handleUrlContainerClick = (e) => {
    e.stopPropagation()
    if (!isUrlExpanded) {
      handleUrlOpen()
    }
  }

  const handleUrlInputBlur = (e) => {
    setTimeout(() => {
      if (!urlContainerRef.current?.contains(document.activeElement)) {
        handleUrlClose()
      }
    }, 100)
  }

  // ===== JSON HANDLING FUNCTIONS =====

  const handleJsonPopupOpen = () => {
    setIsJsonPopupOpen(true)
    setJsonError("")
    setErrorLineNumber(null)
    setTimeout(() => {
      jsonTextareaRef.current?.focus()
    }, 100)
  }

  const handleJsonPopupClose = () => {
    setIsJsonPopupOpen(false)
    setJsonError("")
    setErrorLineNumber(null)
  }

  const handleJsonInputChange = (e) => {
    const newValue = e.target.value
    setJsonInput(newValue)

    // Clear error when user types
    if (jsonError) {
      setJsonError("")
      setErrorLineNumber(null)
    }
  }

  const handleAutoWrap = () => {
    const wrapResult = autoWrapObjects(jsonInput)

    setAutoWrapMessage(wrapResult.message)

    if (wrapResult.wasWrapped) {
      setJsonInput(wrapResult.result)
      // Try to format it as well
      try {
        const parsed = JSON.parse(wrapResult.result)
        setJsonInput(JSON.stringify(parsed, null, 2))
      } catch (e) {
        // If formatting fails, just use the wrapped version
      }
    }

    // Clear message after 3 seconds
    setTimeout(() => setAutoWrapMessage(""), 3000)
  }

  const handleJsonSubmit = () => {
    // Check if input is empty
    if (!jsonInput.trim()) {
      setJsonError("Please enter some JSON data before submitting.")
      setErrorLineNumber(null)
      return
    }

    // First try auto-wrapping if needed
    const wrapResult = autoWrapObjects(jsonInput)
    const processedInput = wrapResult.result

    // Use enhanced JSON parsing
    const parseResult = parseJsonSafely(processedInput)

    if (!parseResult.success) {
      const error = parseResult.error
      let errorMessage = `❌ ${error.message}\n\n💡 ${error.suggestion}`

      if (error.type === "incomplete") {
        errorMessage +=
          "\n\n🔍 This often happens when copying data that gets cut off. Please check the source and copy the complete JSON."
      }

      setJsonError(errorMessage)
      setErrorLineNumber(null)

      // If we auto-wrapped, update the input to show the processed version
      if (wrapResult.wasWrapped) {
        setJsonInput(processedInput)
      }
      return
    }

    const parsedData = parseResult.data
    const validation = validateArrayOfObjects(parsedData)

    if (!validation.isValid) {
      // Ensure we're setting a string, not an object
      setJsonError(typeof validation.error === "string" ? validation.error : JSON.stringify(validation.error))
      setErrorLineNumber(null)

      // If we auto-wrapped, update the input to show the processed version
      if (wrapResult.wasWrapped) {
        setJsonInput(processedInput)
      }
      return
    }

    // Success - apply the data
    setRawJsonData(parsedData)
    setJsonError("")
    setErrorLineNumber(null)
    handleJsonPopupClose()

    console.log(`Successfully loaded ${parsedData.length} records`)
    if (wrapResult.wasWrapped) {
      console.log(`Auto-wrapped during submission: ${wrapResult.message}`)
    }
  }

  const handleTextareaScroll = () => {
    if (jsonTextareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = jsonTextareaRef.current.scrollTop
    }
  }

  const formatJsonInput = () => {
    try {
      // First try auto-wrapping if needed
      const wrapResult = autoWrapObjects(jsonInput)
      const processedInput = wrapResult.result

      const parsed = JSON.parse(processedInput)
      const formatted = JSON.stringify(parsed, null, 2)
      setJsonInput(formatted)
      setJsonError("")
      setErrorLineNumber(null)

      if (wrapResult.wasWrapped) {
        console.log(`Auto-wrapped during formatting: ${wrapResult.message}`)
      }
    } catch (e) {
      // Don't format if invalid JSON
      console.log("Cannot format invalid JSON")
    }
  }

  // ===== MODE TOGGLE FUNCTION =====

  const toggleDataMode = (mode) => {
    if (mode !== dataMode) {
      setDataMode(mode)
      if (mode === "url") {
        setUrl(globaleUrl)
        handleJsonPopupClose()
      } else {
        setJsonInput(JSON.stringify(rawJsonData || [], null, 2))
        handleUrlClose()
      }
    }
  }

  // ===== EFFECTS =====

  useEffect(() => {
    if (dataMode === "url") {
      setUrl(globaleUrl)
    }
  }, [globaleUrl, dataMode])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (urlContainerRef.current && !urlContainerRef.current.contains(event.target)) {
        handleUrlClose()
      }
    }

    if (isUrlExpanded) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isUrlExpanded])

  // ===== RENDER =====
  return (
    <>
      {/* ===== MAIN HEADER CONTAINER ===== */}
      <div className="flex items-center justify-between space-x-5 bg-white p-2 my-1 z-10">
        {/* Left Section - Title and Input Controls */}
        <div className="flex gap-x-2 items-center">
          {/* App Title */}
          <h2 className="text-xl font-semibold mr-3">
            <Hammer size={40} className="inline-block p-1 rounded-full border-black border-2 mr-1" />
            <span className="hidden md:inline-block"> Enrich table</span>
          </h2>

          <div className="flex items-center gap-x-3">
            {/* Data Mode Toggle Switch */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => toggleDataMode("url")}
                className={`flex items-center gap-2 px-3 py-1.5 cursor-pointer rounded-md text-sm font-medium transition-all ${
                  dataMode === "url" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Globe size={16} />
                URL
              </button>
              <button
                onClick={() => toggleDataMode("json")}
                className={`flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  dataMode === "json" ? "bg-white text-purple-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Code size={16} />
                JSON
              </button>
            </div>

            {/* URL Input Field (shown when URL mode is active) */}
            {dataMode === "url" && (
              <div
                ref={urlContainerRef}
                className={`
                  relative rounded-full border-2 h-[2.5rem] flex items-center
                  ${
                    isUrlExpanded
                      ? "w-[20rem] border-blue-500 bg-blue-50"
                      : "w-[2.5rem] border-gray-400 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"
                  }
                  transition-all duration-300 ease-in-out overflow-hidden cursor-pointer
                `}
                onClick={handleUrlContainerClick}
              >
                {/* Icon when collapsed */}
                <div
                  className={`
                    absolute left-0 top-0 h-full w-[2.5rem] flex items-center justify-center
                    ${isUrlExpanded ? "opacity-0 pointer-events-none" : "opacity-100"}
                    transition-opacity duration-200
                  `}
                >
                  <Link size={16} className="text-gray-600" />
                </div>

                {/* URL input field */}
                <input
                  ref={urlInputRef}
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onBlur={handleUrlInputBlur}
                  onKeyDown={handleUrlKeyDown}
                  placeholder="Enter API endpoint URL..."
                  className={`
                    w-full h-full bg-transparent outline-none px-4 text-sm
                    ${isUrlExpanded ? "opacity-100" : "opacity-0 pointer-events-none"}
                    transition-opacity duration-200
                  `}
                />

                {/* Close button when expanded */}
                {isUrlExpanded && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleUrlClose()
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <X size={14} className="text-gray-500" />
                  </button>
                )}
              </div>
            )}

            {/* JSON Button (shown when JSON mode is active) */}
            {dataMode === "json" && (
              <button
                onClick={handleJsonPopupOpen}
                className="flex items-center gap-2 px-4 py-2 bg-purple-100 border-2 border-purple-500 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
              >
                <Code size={16} />
                <span className="text-sm font-medium">Add JSON Data</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Section - Filter and Pagination Controls */}
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

      {/* ===== JSON INPUT POPUP MODAL ===== */}
      {isJsonPopupOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col">
            {/* Modal Header - Fixed */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 flex-shrink-0">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Add JSON Data</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-gray-500 font-medium">Required Format:</span>
                  <span className="bg-purple-100 border border-purple-300 text-purple-700 px-2 py-1 rounded-md text-xs font-medium">
                    Array of Objects
                  </span>
                </div>
              </div>
              <button
                onClick={handleJsonPopupClose}
                className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Instructions - Fixed */}
            <div className="px-6 py-4 bg-blue-50 border-b border-blue-100 flex-shrink-0">
              <p className="text-sm text-blue-800 flex items-center gap-2">
                <AlertCircle size={16} className="text-blue-600" />
                Enter JSON objects. If you paste objects without array brackets, we'll automatically wrap them for you.
              </p>
            </div>

            {/* JSON Editor Section - Flexible */}
            <div className="flex-1 flex flex-col p-6 min-h-0">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium text-gray-700">JSON Data</label>
                <div className="flex gap-2">
                  <button
                    onClick={handleAutoWrap}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors font-medium"
                  >
                    <Zap size={12} />
                    Auto-Wrap Objects
                  </button>
                  <button
                    onClick={formatJsonInput}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors font-medium"
                  >
                    <Code size={12} />
                    Format JSON
                  </button>
                </div>
              </div>

              {/* Auto-wrap feedback message */}
              {autoWrapMessage && (
                <div className="mb-2">
                  <div
                    className={`text-xs px-3 py-2 rounded-md ${
                      autoWrapMessage.includes("successful") || autoWrapMessage.includes("Wrapped")
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-blue-100 text-blue-700 border border-blue-200"
                    }`}
                  >
                    {autoWrapMessage}
                  </div>
                </div>
              )}

              {/* Main Content Area - Split between editor and error when error exists */}
              <div className="flex-1 flex gap-4 min-h-0">
                {/* IDE-like JSON Editor Container */}
                <div
                  className={`${jsonError ? "flex-1" : "w-full"} border border-gray-300 rounded-lg overflow-hidden bg-white shadow-inner`}
                >
                  <div className="flex h-full">
                    {/* Line Numbers Column */}
                    <div
                      ref={lineNumbersRef}
                      className="w-12 bg-gray-50 border-r border-gray-200 overflow-hidden flex-shrink-0"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                        WebkitScrollbar: { display: "none" },
                      }}
                    >
                      <div className="py-3 text-xs text-gray-500 font-mono leading-5 text-right pr-2 select-none">
                        {jsonInput.split("\n").map((_, index) => (
                          <div
                            key={index + 1}
                            className={`h-5 flex items-center justify-end ${
                              errorLineNumber === index + 1 ? "bg-red-200 text-red-800 font-bold" : ""
                            }`}
                          >
                            {index + 1}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Code Editor Textarea */}
                    <div className="flex-1 relative">
                      <textarea
                        ref={jsonTextareaRef}
                        value={jsonInput}
                        onChange={handleJsonInputChange}
                        onScroll={handleTextareaScroll}
                        placeholder={`Paste your JSON here. Examples:

Single object (will be auto-wrapped):
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}

Or array of objects:
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com"
  }
]`}
                        className="w-full h-full p-3 resize-none focus:outline-none font-mono text-sm leading-5 bg-transparent placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Error Panel - Shows alongside editor when error exists */}
                {jsonError && (
                  <div className="w-96 flex-shrink-0">
                    <div className="h-full bg-red-50 border-l-4 border-red-400 rounded-r-lg overflow-hidden flex flex-col">
                      {/* Error Header */}
                      <div className="bg-red-100 px-4 py-3 border-b border-red-200">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-red-500" />
                          <h3 className="text-sm font-semibold text-red-800">Validation Error</h3>
                        </div>
                      </div>

                      {/* Error Content - Scrollable */}
                      <div className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-4">
                          {/* Error Details */}
                          <div className="bg-red-100 p-3 rounded-md border border-red-200">
                            <div className="text-sm text-red-700 font-mono whitespace-pre-line">
                              {typeof jsonError === "string"
                                ? jsonError
                                : "An error occurred while processing your JSON."}
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="space-y-2">
                            <h4 className="text-xs font-semibold text-red-800 uppercase tracking-wide">
                              🔧 Quick Actions
                            </h4>
                            {errorLineNumber && (
                              <button
                                onClick={jumpToErrorLine}
                                className="w-full text-left px-3 py-2 text-xs bg-white border border-red-300 rounded-md hover:bg-red-50 transition-colors text-red-700 font-medium"
                              >
                                📍 Jump to Line {errorLineNumber}
                              </button>
                            )}
                            <button
                              onClick={handleAutoWrap}
                              className="w-full text-left px-3 py-2 text-xs bg-white border border-red-300 rounded-md hover:bg-red-50 transition-colors text-red-700"
                            >
                              🔄 Auto-Wrap Objects
                            </button>
                            <button
                              onClick={formatJsonInput}
                              className="w-full text-left px-3 py-2 text-xs bg-white border border-red-300 rounded-md hover:bg-red-50 transition-colors text-red-700"
                            >
                              ✨ Try Auto-Format
                            </button>
                          </div>

                          {/* Quick Fix Guide */}
                          <div className="bg-white p-3 rounded-md border border-red-200">
                            <h4 className="text-xs font-semibold text-red-800 mb-2 uppercase tracking-wide">
                              💡 Common Fixes
                            </h4>
                            <ul className="text-xs text-red-700 space-y-1">
                              <li className="flex items-start gap-2">
                                <span className="text-red-500 font-bold">•</span>
                                <span>Use double quotes (") for strings</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-red-500 font-bold">•</span>
                                <span>Remove trailing commas</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-red-500 font-bold">•</span>
                                <span>Match all brackets [ ] and braces {}</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-red-500 font-bold">•</span>
                                <span>Try the Auto-Wrap feature for objects</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons - Fixed at bottom */}
            <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
              <button
                onClick={handleJsonPopupClose}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
              <div className="flex items-center gap-3">
                {jsonInput.trim() && !jsonError && (
                  <div className="text-xs text-green-600 flex items-center gap-1">
                    <Check size={12} />
                    <span>Ready to apply</span>
                  </div>
                )}
                <button
                  onClick={handleJsonSubmit}
                  disabled={!jsonInput.trim()}
                  className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Apply JSON Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TableCommandHeader
