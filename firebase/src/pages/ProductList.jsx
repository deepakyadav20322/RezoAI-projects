import React, { useEffect } from 'react'
import ProductCard from '../components/Product/ProductCard';
import Sidebar from '../components/Product/ProductSidebar';

import { useDispatch, useSelector } from 'react-redux';
import { use } from 'react';
import { fetchAllProducts } from '../features/Product/ProductSlice';
const ProductList = () => {

  const categories = ["Electronics", "Clothing", "Home", "Sports", "Books"]

  const onFilterChange = (filters) => {
    console.log("Filters Applied:", filters)
 
  }
        const dispatch = useDispatch();
  const {products, loading , error} = useSelector((state) => state.products);
  console.log(products);


  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center items-center max-w-[90rem] w-full mx-auto gap-10 my-10">
      <p className='text-xl font-semibold py-2'>Your All Products 🎉</p>
    <div className="flex flex-row justify-center ">
      {/* <div className="w-1/6 sticky top-28 self-start">
        <Sidebar categories={categories} onFilterChange={onFilterChange} />
      </div> */}
      <div className="w-full mx-auto  ">
        {loading ?( <div className=" text-center py-10 animate-spin h-[20rem] w-full flex justify-center items-center"> <div className="w-8 h-8 border-t-3 border-blue-500 rounded-full"></div> </div>):
        (
        <div className="flex flex-wrap  gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>)}     
      </div>
    </div>
    </div> )
}

export default ProductList



// export const products = [
//   {
//     id: "1",
//     name: "Smartphone X",
//     description: "Latest model with advanced camera and long-lasting battery.",
//     price: 799.99,
//     discountPercentage: 10,
//     rating: 4.5,
//     stock: 50,
//     brand: "TechGiant",
//     category: "Electronics",
//     thumbnail: "/placeholder.svg?height=300&width=300",
//   },
//   {
//     id: "2",
//     name: "Laptop Pro",
//     description: "Powerful laptop for professionals and creatives.",
//     price: 1299.99,
//     rating: 4.8,
//     stock: 30,
//     brand: "CompuTech",
//     category: "Electronics",
//     thumbnail: "/placeholder.svg?height=300&width=300",
//   },
//   {
//     id: "3",
//     name: "Wireless Earbuds",
//     description: "High-quality sound with noise cancellation.",
//     price: 149.99,
//     discountPercentage: 15,
//     rating: 4.3,
//     stock: 100,
//     brand: "AudioPro",
//     category: "Audio",
//     thumbnail: "/placeholder.svg?height=300&width=300",
//   },
//   {
//     id: "4",
//     name: "Smart Watch",
//     description: "Track your fitness and stay connected on the go.",
//     price: 249.99,
//     rating: 4.6,
//     stock: 75,
//     brand: "FitTech",
//     category: "Wearables",
//     thumbnail: "/placeholder.svg?height=300&width=300",
//   },
//   {
//     id: "5",
//     name: "4K TV",
//     description: "Immersive viewing experience with vibrant colors.",
//     price: 799.99,
//     discountPercentage: 5,
//     rating: 4.7,
//     stock: 20,
//     brand: "VisionMax",
//     category: "Electronics",
//     thumbnail: "/placeholder.svg?height=300&width=300",
//   },
//   {
//     id: "6",
//     name: "Gaming Console",
//     description: "Next-gen gaming with stunning graphics and fast load times.",
//     price: 499.99,
//     rating: 4.9,
//     stock: 0,
//     brand: "GameMaster",
//     category: "Gaming",
//     thumbnail: "/placeholder.svg?height=300&width=300",
//   },
// ]

