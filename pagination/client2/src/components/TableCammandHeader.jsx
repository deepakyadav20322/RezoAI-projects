import React from 'react'
import ToggleColumn from './ToggleColumn'
import PaginationBox from './PaginationBox'

const TableCammandHeader = () => {
  return (
    <div className='flex items-center justify-between space-x-5 bg-white p-2 my-1  z-10'>
    <h2 className='text-xl font-semibold'>Feature Enrich table</h2>
    <div className='flex items-center space-x-5'>
    <ToggleColumn/>
    <PaginationBox/>

    </div>
    </div>
  )
}

export default TableCammandHeader