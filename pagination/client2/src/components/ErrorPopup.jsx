// import React, { useState, useEffect } from 'react';
// import { X, RefreshCw, Save, AlertCircle } from 'lucide-react';
// import { useData } from "../context/DataContext";

// const ErrorPopup = () => {
//   const {
//     globalFormatError,
//     setGlobalFormatError,
//     url: globalUrl,
//     setUrl: setGlobalUrl
//   } = useData();

//   const [localUrl, setLocalUrl] = useState(globalUrl);

//   // Update localUrl whenever globalUrl changes
//   useEffect(() => {
//     setLocalUrl(globalUrl);
//   }, [globalUrl]);

//   const handleSave = () => {
//     setGlobalUrl(localUrl); // Update global URL
//     setGlobalFormatError(false);
//   };

//   const handleRetry = () => {
//     // Just close the popup - the parent component will retry automatically
//     setGlobalFormatError(false);
//   };

//   if (!globalFormatError) return null;

//   return (
//     <div className="fixed inset-0 bg-white/95  flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex items-center">
//             <AlertCircle className="text-red-500 mr-2" size={24} />
//             <h3 className="text-lg font-semibold">API Error</h3>
//           </div>
//           <button
//             onClick={() => setGlobalFormatError(false)}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         <div className="mb-6">
//           <p className="text-gray-700 mb-4">
//             The current API endpoint failed to load or returned invalid data format.
//             Please check the URL or try a different endpoint.
//           </p>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               API Endpoint URL
//             </label>
//             <input
//               type="text"
//               value={localUrl}
//               onChange={(e) => setLocalUrl(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="your api url ..."
//             />
//           </div>
//         </div>

//         <div className="flex justify-end space-x-3">
//           <button
//             onClick={handleRetry}
//             className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//           >
//             <RefreshCw className="mr-2" size={16} />
//             Retry
//           </button>
//           <button
//             onClick={handleSave}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             <Save className="mr-2" size={16} />
//             Save & Reload
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ErrorPopup;

import React, { useState, useEffect } from "react";
import { X, RefreshCw, Save, AlertCircle, Globe, Code } from "lucide-react";
import {motion,AnimatePresence} from 'framer-motion'
import { useData } from "../context/DataContext";

const ErrorPopup = () => {
  const {
    globalFormatError,
    setGlobalFormatError,
    url: globalUrl,
    setUrl: setGlobalUrl,
  } = useData();

  const [localUrl, setLocalUrl] = useState(globalUrl);

  // Get appropriate icon and color based on error type
  const getErrorDetails = () => {
    switch (globalFormatError.type) {
      case "TypeError":
        return {
          icon: <Globe className="text-red-500 mr-2" size={24} />,
          color: "red",
        };
      case "SyntaxError":
        return {
          icon: <Code className="text-yellow-500 mr-2" size={24} />,
          color: "yellow",
        };
      default:
        return {
          icon: <AlertCircle className="text-orange-500 mr-2" size={24} />,
          color: "orange",
        };
    }
  };

  const { icon, color } = getErrorDetails();

  const handleSave = () => {
    setGlobalUrl(localUrl);
  };

  // Update localUrl whenever globalUrl changes
  useEffect(() => {
    setLocalUrl(globalUrl);
  }, [globalUrl]);

  const handleRetry = () => {
    setGlobalFormatError({ isError: false, type: null, message: "", url: "" });
  };

  if (!globalFormatError.isError) return null;

  return (
    <div className="fixed inset-0 bg-gray-50/90 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            {icon}
            <h3 className="text-lg font-semibold">
              {globalFormatError.type || "API Error"}
            </h3>
          </div>
          <button
            onClick={handleRetry}
            className="text-gray-500 hover:text-gray-700"
          >
            {/* <X size={20} /> */}
          </button>
        </div>

        <div className="mb-6">
          <div
            className={`p-3 mb-4 bg-${color}-50 border-l-4 border-${color}-500`}
          >
            <p className="text-gray-700">
              <strong>Failed URL:</strong> {globalFormatError.url}
            </p>
            <p className="text-gray-700 mt-1">
              <strong>Error:</strong>
              <AnimatePresence mode="wait">
                <motion.span
                  key={globalFormatError.message} // This triggers animation when message changes
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="text-red-500 px-2"
                >
                  {globalFormatError.message}
                </motion.span>
              </AnimatePresence>
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter new API endpoint URL
            </label>
            <input
              type="text"
              value={localUrl}
              onChange={(e) => setLocalUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/api/data"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={handleRetry}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-not-allowed"
            disabled={true}
          >
            <RefreshCw className="mr-2" size={16} />
            Try Again
          </button>
          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
          >
            <Save className="mr-2" size={16} />
            Change URL
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopup;
