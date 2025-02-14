import React from 'react'

const TableLoader = () => {
  return (
    <div className="bg-white h-full min-h-screen w-full overflow-auto p-4">
      <div className="overflow-hidden border border-gray-400 rounded-lg shadow-md">
        <div className="overflow-x-auto min-h-[calc(100vh - 10rem)]">
          <table className="min-w-full max-w-full border-collapse divide-y divide-gray-200">
            <thead className="bg-gray-100 sticky top-0 left-0 right-0">
              <tr>
                {Array.from({ length: 6 }).map((_, index) => (
                  <th key={index} className="px-6 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border border-gray-300 min-w-36">
                    <div className="h-8  bg-gray-200 rounded-md animate-pulse"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.from({ length: 12}).map((_, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {Array.from({ length: 6 }).map((_, colIndex) => (
                    <td key={colIndex} className="px-6 py-2 text-sm text-gray-500 border border-gray-300">
                      <div className="h-8 bg-gray-200 rounded-md animate-pulse"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TableLoader