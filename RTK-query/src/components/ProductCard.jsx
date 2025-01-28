import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../features/cart/CartSlice';
import { FaTrash } from 'react-icons/fa';
import { useDeleteProductMutation } from '../features/products/ProductAPI';
addToCart

const ProductCard = ({ product }) => {
  const { images, title, price, rating ,id} = product;
  const dispatch = useDispatch()
  const [deleteProduct] = useDeleteProductMutation();

    const handleAddToCart = () => {
    console.log('add to cart');
    dispatch(addToCart(product))
    }


    const handleDelete = (e) => {
       deleteProduct(id);
      console.log('delete product',id);
      return
      if (onDelete) {
        onDelete(product);
      }
    };

  return (
    <div className="max-w-[20rem] rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
    
    <div className="relative h-48 overflow-hidden">
        <Link to={`/product-details/${id}`}>
          <img
            src={images[0]}
            alt={title}
            className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 p-1 rounded-full bg-red-500 hover:bg-red-600 text-white"
        >
          <FaTrash size={20} />
        </button>
      </div>
     
      <div className="p-4">
       
        <h2 className="text-lg font-semibold text-gray-800 truncate">{title}</h2>

       
        <p className="text-xl font-bold text-gray-900 mt-2">${price}</p>

       
        <div className="flex items-center mt-2 text-yellow-400">
          {Array.from({ length: Math.floor(rating.rate) }).map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2c-.463 0-.925.162-1.28.488l-2.923 2.742-3.221-.486a1.567 1.567 0 00-1.731 1.141l-.49 3.25-3.146 2.2c-.666.466-.9 1.294-.584 1.991l1.31 3.025-1.124 3.157c-.315.697-.082 1.525.585 1.991l3.145 2.2.49 3.251c.225 1.494 1.653 2.477 2.976 1.852l3.22-.486 2.923 2.742c.716.671 1.812.671 2.528 0l2.922-2.742 3.221.486c1.323.624 2.751-.358 2.976-1.852l.49-3.251 3.145-2.2c.666-.466.9-1.294.584-1.991l-1.31-3.025 1.124-3.157c.315-.697.082-1.525-.584-1.991l-3.146-2.2-.49-3.251c-.225-1.494-1.653-2.477-2.976-1.852l-3.221.486-2.923-2.742a1.708 1.708 0 00-1.281-.488z" />
            </svg>
          ))}
          <span className="ml-2 text-gray-600">({rating.count} reviews)</span>
        </div>

        <button   onClick={handleAddToCart} className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
          
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
