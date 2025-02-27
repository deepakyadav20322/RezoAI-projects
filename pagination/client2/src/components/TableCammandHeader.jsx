import React from 'react'
import ToggleColumn from './ToggleColumn'
import PaginationBox from './PaginationBox'
import FilterRowsONQueries from './FilterRowsONQueries'
import { Hammer } from 'lucide-react'

const TableCammandHeader = () => {
  return (
    <div className='flex items-center justify-between space-x-5 bg-white p-2 my-1  z-10'>
    <h2 className='text-xl font-semibold'><Hammer size={40} className='inline-block p-1 rounded-full border-black border-2'/> <span className='hidden md:inline-block'>Feature Enrich table</span></h2>
    <div className='flex items-center space-x-12'>
    <div className='flex space-x-5'>
    <FilterRowsONQueries/>
    <ToggleColumn/>
    </div>
    <div className="hidden md:block">
    <PaginationBox/>
    </div>
    </div>
    </div>
  )
}

export default TableCammandHeader