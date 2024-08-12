/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

function ProductCard({ product }) {
  const { user } = useAuth();
  

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please sign in to add items to your cart.');
      return;
    }

    try {
      await addToCart(product._id, 1,user._id);
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <img src={product.image} alt={product.name} className="w-full h-72 object-fill" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
        <div className="flex justify-between items-center">
          <Link to={`/product/${product._id}`} className="text-blue-500 hover:underline">
            View Details
          </Link>
          <button 
            onClick={handleAddToCart}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;