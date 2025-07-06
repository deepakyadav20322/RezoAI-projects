import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ExportOption from "./ExportOptions";
import { useData } from "../../context/DataContext";
import {
  downloadFile,
  convertToCSV,
  convertToXLSX,
  convertToXML,
} from "../../utils/exportHelper";

const ExportModal = ({ isOpen, onClose }) => {
  const { rawJsonData } = useData();

  const validateData = () => {
    if (!rawJsonData) {
      alert("No data loaded");
      return false;
    }
    if (!Array.isArray(rawJsonData)) {
      alert("Data must be an array");
      return false;
    }
    if (rawJsonData.length === 0) {
      alert("Data is empty");
      return false;
    }
    return true;
  };

  const handleExport = async (converter, fileName, mimeType) => {
    if (!validateData()) return;

    try {
      const content = await converter(rawJsonData);
      downloadFile(content, fileName, mimeType);
    } catch (error) {
      console.error("Export failed:", error);
      alert(`Export failed: ${error.message}`);
    }
    onClose();
  };

  const exportOptions = [
    // Spreadsheet formats grouped together
    {
      title: "Download CSV",
      description: "Standard spreadsheet format (comma-separated)",
      icon: "csv",
      onClick: () => handleExport(convertToCSV, "data.csv", "text/csv"),
      group: "spreadsheet",
    },
    {
      title: "Download Excel (XLSX)",
      description: "Microsoft Excel format with multiple sheets support",
      icon: "xlsx",
      onClick: () =>
        handleExport(
          convertToXLSX,
          "data.xlsx",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ),
      group: "spreadsheet",
    },
    // JSON formats
    {
      title: "Download JSON",
      description: "Full formatted JSON data",
      icon: "json",
      onClick: () =>
        handleExport(
          (data) => JSON.stringify(data, null, 2),
          "data.json",
          "application/json"
        ),
      group: "json",
    },
    {
      title: "Download Minified JSON",
      description: "Compact JSON without whitespace",
      icon: "minify",
      onClick: () =>
        handleExport(
          (data) => JSON.stringify(data),
          "data.min.json",
          "application/json"
        ),
      group: "json",
    },
    // XML format
    {
      title: "Convert to XML",
      description: "Export as XML format",
      icon: "xml",
      onClick: () => handleExport(convertToXML, "data.xml", "application/xml"),
      group: "xml",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-md"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Export Options</h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-red-600 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Spreadsheet Section */}
                <div>
                  {/* <h4 className="text-sm font-medium text-gray-500 mb-2">Spreadsheet Formats</h4> */}
                  <div className="space-y-3">
                    {exportOptions
                      .filter((opt) => opt.group === "spreadsheet")
                      .map((option, index) => (
                        <ExportOption key={index} {...option} />
                      ))}
                  </div>
                </div>

                {/* JSON Section */}
                <div>
                  {/* <h4 className="text-sm font-medium text-gray-500 mb-2">JSON Formats</h4> */}
                  <div className="space-y-3">
                    {exportOptions
                      .filter((opt) => opt.group === "json")
                      .map((option, index) => (
                        <ExportOption key={index} {...option} />
                      ))}
                  </div>
                </div>

                {/* XML Section */}
                <div>
                  {/* <h4 className="text-sm font-medium text-gray-500 mb-2">Other Formats</h4> */}
                  <div className="space-y-3">
                    {exportOptions
                      .filter((opt) => opt.group === "xml")
                      .map((option, index) => (
                        <ExportOption key={index} {...option} />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExportModal;
