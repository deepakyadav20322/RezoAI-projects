import React from 'react'
import { useSelector } from 'react-redux';

const Dashboard = () => {

  return (
    <div>

<div className='text-3xl font-bold text-center my-8'>Admin dashboard</div>
<p className='text-center font-medium'>Now your role is- <span className='text-red-500'>Admin</span></p>
    </div>
  )
}

export default Dashboard