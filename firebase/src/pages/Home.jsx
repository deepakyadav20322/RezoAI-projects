import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
const Home = () => {

  const {user,loading} = useSelector((state) => state.auth);
 const location = useLocation();
  useEffect(() => {
    if (location.state?.error) {
      console.log(location.state.error)
      toast.error(location.state.error, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, [location.state]);

  return(
  <div className='max-w-7xl mx-auto'>


    <div className='text-6xl font-bold text-center h-[80vh]'>
      <div className='flex flex-col justify-center items-center bg-slate-200 rounde-2xl h-[80%] my-5'>
        <div className='h-28 pb-[-1rem]'> 🧑 </div>
        Welcome to the Home Page
        <p className='font-semibold text-3xl py-6'>Firebase + ReduxToolkit + User + Products + Admin</p>
        <code className='text-xl font-semibold text-green-500 '>{JSON.stringify(user,null,2)}{" "}  <span className='font-medium'>{( !loading && !user? "No any user login":"")}</span></code>
      
      </div>
    </div>
  </div>
)
}

export default Home