import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { deleteProduct, fetchAllProducts } from '../../features/Product/ProductSlice'; 
import { FiEdit, FiTrash } from "react-icons/fi";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AllProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  // Dispatch action to fetch products when the component mounts
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  const handleDelete = async(productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
        try {

      const result = await dispatch(deleteProduct({ productId })).unwrap();
      toast.success("Product deleted successfully");
      console.log(result);
        } catch (error) {
            toast.error("Failed to delete the product"+error.message);
    }
  };
}


  if (loading) {
    return <div className="text-center py-10 animate-spin h-[24rem] w-[78rem] flex justify-center items-center">
        <div className="w-8 h-8 border-t-3 border-blue-500 rounded-full"></div>
    </div>; // Show loading message or spinner
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>; // Handle error state
  }

  return (
<div className="max-w-6xl mx-auto my-10 bg-white shadow-lg rounded-lg overflow-auto w-full lg:min-w-6xl min-h-[400px]">

<div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-900 text-white text-left uppercase text-sm">
              <th className="py-3 px-6">Title</th>
              <th className="py-3 px-6">Description</th>
              <th className="py-3 px-6">Category</th>
              <th className="py-3 px-6">Brand</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-100 transition">
                <td className="py-3 px-6">{product.title}</td>
                <td className="py-3 px-6 truncate max-w-xs">{product.description}</td>
                <td className="py-3 px-6">{product.category}</td>
                <td className="py-3 px-6">{product.brand}</td>
                <td className="py-3 px-6 text-center flex justify-center gap-3">
                  <button>
                  <Link to={`/admin/dashboard/edit-product/${product.id}`} className="text-blue-500 hover:text-blue-700">
                    <FiEdit size={18} />
                  </Link>
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(product.id)}>
                  <FiTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
