import React from "react";

import { FileJson, FileOutput, Minus, FileCode2, FileSpreadsheet } from "lucide-react";

const iconComponents = {
  json: FileJson,
  minify: Minus,
  csv: FileOutput,
  xml: FileCode2,
  xlsx: FileSpreadsheet,
};

const ExportOption = ({ title, description, icon, onClick }) => {
  const Icon = iconComponents[icon] || FileOutput;

  return (
    <button
      onClick={onClick}
      className="w-full p-4 flex items-start gap-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
      aria-label={`Export as ${title}`}
    >
      <div className={`p-2 rounded-lg ${
        icon === 'csv' ? 'bg-green-100 text-green-600' :
        icon === 'xlsx' ? 'bg-green-100 text-green-600' :
        'bg-blue-100 text-blue-600'
      }`}>
        <Icon size={20} />
      </div>
      <div>
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </button>
  );
};

export default ExportOption;