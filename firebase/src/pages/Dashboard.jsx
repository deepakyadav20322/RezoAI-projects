import React from 'react'
import UserProfile from '../components/UserProfile'
import { useSelector } from 'react-redux'
const Dashboard = () => {
  const {user,loading } = useSelector((state) => state.auth);
  return (
    <div className='text-3xl font-bold text-center my-8 mb-10'>User dashboard
      <UserProfile user={user} loading={loading} />
    </div>
  )
}

export default Dashboard

