import React, { useEffect,useState } from 'react'
import { useData } from '../context/DataContext';
import TableCammandHeader from './TableCammandHeader';
import { ChevronsUpDown } from 'lucide-react';
import usePagination from '../hooks/usePagination';
import useResizableTable from '../hooks/useResizeableTable'



const Tables = () => {

const {data,rows,headers,handleSort,sortConfig,rowsPerPage} = useData();   
const { columnWidths, startResizing } = useResizableTable([150, 150]);
const { paginatedRows} = usePagination(data, rowsPerPage);
console.log('data',rows);
const {} = usePagination(data,rows);
console.log('data',sortConfig);

 
  return (
    <div className='container mt-5 text-center max-w-7xl mx-auto w-full border-2 border-gray-200 p-5 overflow-x-auto'>
      {/* Table Headers-------------- */}
      <div className=''>
      <TableCammandHeader/>
      </div>
        <table className='w-full border-collapse bg-white text-left text-sm text-gray-700 border-[1px] border-gray-600 divide-y divide-gray-200 rounded-sm py-4 '>
        <thead className="bg-black text-white uppercase  ">
        <tr className='text-left'>
    {headers
        .filter((item) => item.visible) 
        .map((item,ind) => (
            <th onClick={()=>handleSort( item.accessor  )} key={item.accessor} className="border border-gray-400 px-4 py-2 cursor-pointer relative"
             style={{ width: columnWidths[ind] || 150 }}
            
            >
              <span className='flex justify-between items-center'>
              {item.Header}
              <ChevronsUpDown size={20} />
              </span>
              <span
                    className=" h-full w-1 cursor-ew-resize bg-red-500 border border-gray-400 absolute right-0 top-0"
                    onMouseDown={(e) => startResizing(ind, e)}
                  ></span>
            </th>
        ))
    }
</tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
            {rows.length!=0 && rows.map((item,index)=>(
        //   {rows.length!=0 && rows.map((item,index)=>(
                <tr key={index} className="hover:bg-gray-50">
                    {headers.length!=0 && headers.map((header,index)=>(
                            header.visible &&

                        <td key={index} className="border border-gray-300 px-4 py-2">{item[header.accessor]}</td>

                    ))}
                </tr>
            ))}

        { rows.length==0 && <tr><td colSpan={headers.length} className='text-center'>No Data Found</td></tr> }
      </tbody>
        </table>
    </div>
  )
}

export default Tables