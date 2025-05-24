// // import React, { useState, useEffect } from 'react';
// // import { X, RefreshCw, Save, AlertCircle } from 'lucide-react';
// // import { useData } from "../context/DataContext";

// // const ErrorPopup = () => {
// //   const {
// //     globalFormatError,
// //     setGlobalFormatError,
// //     url: globalUrl,
// //     setUrl: setGlobalUrl
// //   } = useData();

// //   const [localUrl, setLocalUrl] = useState(globalUrl);

// //   // Update localUrl whenever globalUrl changes
// //   useEffect(() => {
// //     setLocalUrl(globalUrl);
// //   }, [globalUrl]);

// //   const handleSave = () => {
// //     setGlobalUrl(localUrl); // Update global URL
// //     setGlobalFormatError(false);
// //   };

// //   const handleRetry = () => {
// //     // Just close the popup - the parent component will retry automatically
// //     setGlobalFormatError(false);
// //   };

// //   if (!globalFormatError) return null;

// //   return (
// //     <div className="fixed inset-0 bg-white/95  flex items-center justify-center z-50 p-4">
// //       <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
// //         <div className="flex justify-between items-start mb-4">
// //           <div className="flex items-center">
// //             <AlertCircle className="text-red-500 mr-2" size={24} />
// //             <h3 className="text-lg font-semibold">API Error</h3>
// //           </div>
// //           <button
// //             onClick={() => setGlobalFormatError(false)}
// //             className="text-gray-500 hover:text-gray-700"
// //           >
// //             <X size={20} />
// //           </button>
// //         </div>

// //         <div className="mb-6">
// //           <p className="text-gray-700 mb-4">
// //             The current API endpoint failed to load or returned invalid data format.
// //             Please check the URL or try a different endpoint.
// //           </p>

// //           <div className="mb-4">
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               API Endpoint URL
// //             </label>
// //             <input
// //               type="text"
// //               value={localUrl}
// //               onChange={(e) => setLocalUrl(e.target.value)}
// //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               placeholder="your api url ..."
// //             />
// //           </div>
// //         </div>

// //         <div className="flex justify-end space-x-3">
// //           <button
// //             onClick={handleRetry}
// //             className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
// //           >
// //             <RefreshCw className="mr-2" size={16} />
// //             Retry
// //           </button>
// //           <button
// //             onClick={handleSave}
// //             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
// //           >
// //             <Save className="mr-2" size={16} />
// //             Save & Reload
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ErrorPopup;

// import React, { useState, useEffect } from "react";
// import { X, RefreshCw, Save, AlertCircle, Globe, Code } from "lucide-react";
// import {motion,AnimatePresence} from 'framer-motion'
// import { useData } from "../context/DataContext";

// const ErrorPopup = () => {
//   const {
//     globalFormatError,
//     setGlobalFormatError,
//     url: globalUrl,
//     setUrl: setGlobalUrl,
//   } = useData();

//   const [localUrl, setLocalUrl] = useState(globalUrl);

//   // Get appropriate icon and color based on error type
//   const getErrorDetails = () => {
//     switch (globalFormatError.type) {
//       case "TypeError":
//         return {
//           icon: <Globe className="text-red-500 mr-2" size={24} />,
//           color: "red",
//         };
//       case "SyntaxError":
//         return {
//           icon: <Code className="text-yellow-500 mr-2" size={24} />,
//           color: "yellow",
//         };
//       default:
//         return {
//           icon: <AlertCircle className="text-orange-500 mr-2" size={24} />,
//           color: "orange",
//         };
//     }
//   };

//   const { icon, color } = getErrorDetails();

//   const handleSave = () => {
//     setGlobalUrl(localUrl);
//   };

//   // Update localUrl whenever globalUrl changes
//   useEffect(() => {
//     setLocalUrl(globalUrl);
//   }, [globalUrl]);

//   const handleRetry = () => {
//     setGlobalFormatError({ isError: false, type: null, message: "", url: "" });
//   };

//   if (!globalFormatError.isError) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-50/90 bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex items-center">
//             {icon}
//             <h3 className="text-lg font-semibold">
//               {globalFormatError.type || "API Error"}
//             </h3>
//           </div>
//           <button
//             onClick={handleRetry}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             {/* <X size={20} /> */}
//           </button>
//         </div>

//         <div className="mb-6">
//           <div
//             className={`p-3 mb-4 bg-${color}-50 border-l-4 border-${color}-500`}
//           >
//             <p className="text-gray-700">
//               <strong>Failed URL:</strong> {globalFormatError.url}
//             </p>
//             <p className="text-gray-700 mt-1">
//               <strong>Error:</strong>
//               <AnimatePresence mode="wait">
//                 <motion.span
//                   key={globalFormatError.message} // This triggers animation when message changes
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 10 }}
//                   transition={{ duration: 0.2 }}
//                   className="text-red-500 px-2"
//                 >
//                   {globalFormatError.message}
//                 </motion.span>
//               </AnimatePresence>
//             </p>
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Enter new API endpoint URL
//             </label>
//             <input
//               type="text"
//               value={localUrl}
//               onChange={(e) => setLocalUrl(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="https://example.com/api/data"
//             />
//           </div>
//         </div>

//         <div className="flex justify-end space-x-3">
//           <button
//             onClick={handleRetry}
//             className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-not-allowed"
//             disabled={true}
//           >
//             <RefreshCw className="mr-2" size={16} />
//             Try Again
//           </button>
//           <button
//             onClick={handleSave}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
//           >
//             <Save className="mr-2" size={16} />
//             Change URL
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ErrorPopup;



import React,{ useState, useEffect } from "react"
import { X, RefreshCw, Save, AlertCircle, Globe, Code, CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useData } from "../context/DataContext"

const ErrorPopup = () => {
  const { globalFormatError, setGlobalFormatError, url: globalUrl, setUrl: setGlobalUrl } = useData()

  const [localUrl, setLocalUrl] = useState(globalUrl)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // Get appropriate icon and color based on error type
  const getErrorDetails = () => {
    switch (globalFormatError?.type) {
      case "TypeError":
        return {
          icon: <Globe className="text-red-500" size={24} />,
          color: "red",
          bgColor: "bg-red-50",
          borderColor: "border-red-500",
          textColor: "text-red-700",
        }
      case "SyntaxError":
        return {
          icon: <Code className="text-yellow-500" size={24} />,
          color: "yellow",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-500",
          textColor: "text-yellow-700",
        }
      default:
        return {
          icon: <AlertCircle className="text-orange-500" size={24} />,
          color: "orange",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-500",
          textColor: "text-orange-700",
        }
    }
  }

  const errorDetails = globalFormatError?.isError ? getErrorDetails() : null

  const handleSave = async () => {
    if (!localUrl.trim()) return

    setIsLoading(true)

    // Simulate API validation delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    setGlobalUrl(localUrl.trim())
    setIsSaved(true)

    // Auto close after success
    setTimeout(() => {
      handleClose()
    }, 1500)
  }

  const handleRetry = async () => {
    setIsLoading(true)

    // Simulate retry delay
    await new Promise((resolve) => setTimeout(resolve, 600))

    setGlobalFormatError({ isError: false, type: null, message: "", url: "" })
    setIsLoading(false)
  }

  const handleClose = () => {
    setGlobalFormatError({ isError: false, type: null, message: "", url: "" })
    setIsLoading(false)
    setIsSaved(false)
  }

  // Update localUrl whenever globalUrl changes
  useEffect(() => {
    setLocalUrl(globalUrl)
  }, [globalUrl])

  // Reset states when popup opens
  useEffect(() => {
    if (globalFormatError?.isError) {
      setIsLoading(false)
      setIsSaved(false)
    }
  }, [globalFormatError?.isError])

  if (!globalFormatError?.isError) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.3,
          }}
          className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <motion.div
            className="flex justify-between items-start mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
              >
                {errorDetails?.icon}
              </motion.div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{globalFormatError.type || "API Error"}</h3>
                <p className="text-sm text-gray-500">Connection failed</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </motion.button>
          </motion.div>

          {/* Error Details */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className={`p-4 mb-4 ${errorDetails?.bgColor} border-l-4 ${errorDetails?.borderColor} rounded-r-lg`}>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-600">Failed URL:</span>
                  <p className="text-sm text-gray-800 font-mono bg-white/50 px-2 py-1 rounded mt-1 break-all">
                    {globalFormatError.url}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Error:</span>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={globalFormatError.message}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className={`text-sm ${errorDetails?.textColor} mt-1`}
                    >
                      {globalFormatError.message}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* URL Input */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700">Enter new API endpoint URL</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={localUrl}
                onChange={(e) => setLocalUrl(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="https://example.com/api/data"
                disabled={isLoading || isSaved}
              />
            </motion.div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex justify-end space-x-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRetry}
              disabled={isLoading || isSaved}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <motion.div
                animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
                transition={isLoading ? { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" } : {}}
              >
                <RefreshCw className="mr-2" size={16} />
              </motion.div>
              Try Again
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={isLoading || isSaved || !localUrl.trim()}
              className={`flex items-center px-4 py-2 rounded-lg text-white transition-all duration-200 ${
                isSaved ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="mr-2"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <RefreshCw size={16} />
                    </motion.div>
                  </motion.div>
                ) : isSaved ? (
                  <motion.div
                    key="saved"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="mr-2"
                  >
                    <CheckCircle size={16} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="save"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="mr-2"
                  >
                    <Save size={16} />
                  </motion.div>
                )}
              </AnimatePresence>
              {isSaved ? "Saved!" : isLoading ? "Saving..." : "Change URL"}
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ErrorPopup

