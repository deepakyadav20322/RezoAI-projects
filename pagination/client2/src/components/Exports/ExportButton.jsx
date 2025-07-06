import React from "react";
import { Download, ChevronDown } from "lucide-react";
import { useState } from "react";
import ExportModal from "./ExportModal";

const ExportButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
          className="flex items-center justify-center px-4 py-1 text-sm font-medium text-white bg-black border border-gray-700 rounded-md shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black text-nowrap gap-x-2 cursor-pointer"
      >
        <Download size={16} />
        Export
        <ChevronDown size={16} />
      </button>
      <ExportModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ExportButton;