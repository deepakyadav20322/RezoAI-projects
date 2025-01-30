
  import React from 'react';
import { useState } from 'react';
import AddProduct from '../../components/admin/AddProduct';
import EditProduct from '../../components/admin/EditProduct';
import Products from '../../components/admin/AllProducts';


  const Dashboard = () => {
    const [visibleComp,setVisibleComp] = useState('products'); // products, addProduct, editProduct

    return (
      <>
        <div className='text-xl font-medium px-4 py-2'>Admin dashboard</div>
      <div className='flex gap-4'>

   
        <div className="flex gap-4 my-4">
      {/* Sidebar */}
      <div className="border p-4 rounded-md min-w-[200px]">
        <div className="bg-gray-100 p-4 rounded-md min-h-96 h-full">
          <div className="text-lg font-bold mb-4">Admin Actions</div>
          <div className="flex flex-col gap-2">
            <button  onClick={() => setVisibleComp('addProduct')} className="border-[1px] border-black cursor-pointer hover:text-blue-500">Add Product</button>
            {/* <button onClick={() => setVisibleComp('editProduct')} className="hover:underline">Edit Product</button> */}
            <button onClick={() => setVisibleComp('products')} className="border-[1px] border-black cursor-pointer hover:text-blue-500">View Products</button>
          </div>
        </div>
      </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {visibleComp === 'products' && <Products setVisibleComp={setVisibleComp} />}
        {visibleComp === 'addProduct' && <AddProduct setVisibleComp={setVisibleComp} />}
        {visibleComp === 'editProduct' && <EditProduct setVisibleComp={setVisibleComp} />}
      </div>

  
    </div>
       
      </>
    );
  };

  export default Dashboard;
  