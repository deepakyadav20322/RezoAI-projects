import React from 'react'
import ToggleColumn from './ToggleColumn'
import PaginationBox from './PaginationBox'

const TableCammandHeader = () => {
  return (
    <div className='flex items-center justify-end space-x-5'>
    
    <ToggleColumn/>
    <PaginationBox/>
    </div>
  )
}

export default TableCammandHeader