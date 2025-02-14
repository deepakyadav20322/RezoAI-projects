import React from 'react';
import { X } from 'lucide-react';

const renderDetails = (data, path = '') => {
  if (Array.isArray(data)) {
    return data.map((item, index) => (
      <div key={index}>
        {renderDetails(item, `${path}[${index}]`)}
      </div>
    ));
  } else if (typeof data === 'object' && data !== null) {
    return Object.entries(data).map(([key, value]) => (
      <div key={key}>
        <strong>{`${path}${path ? '.' : ''}${key}`}</strong>: {renderDetails(value, `${path}${path ? '.' : ''}${key}`)}
      </div>
    ));
  }
  return <span>{data}</span>;
};

const YourModalComponent = ({ objectData, closeModal, columnName }) => {
  const path = columnName || "Root"; // Use the column name or default to "Root"

  return (
    <div className="fixed inset-0 flex items-start pt-30 justify-center bg-white/20 backdrop-blur-xl z-50">
      <div className="bg-white p-5 rounded-md shadow-lg w-2/3 relative">
        <button onClick={closeModal} className="absolute top-3 right-3 text-red-600 text-xl">
          <X size={24} />
        </button>
        <h3 className="text-lg font-semibold mb-3">Details</h3>
        <div className="mb-3 text-sm text-gray-600">
          <strong>Path: </strong>{path}
        </div>
        <div className="mb-3 text-sm text-gray-600">
          {renderDetails(objectData)}
        </div>
      </div>
    </div>
  );
};

export default YourModalComponent; 

