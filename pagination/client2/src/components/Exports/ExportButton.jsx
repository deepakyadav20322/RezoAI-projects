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
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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