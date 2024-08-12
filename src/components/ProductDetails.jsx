/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts, addToCart } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();

  useEffect(() => {
    getProducts()
      .then(response => {
        const foundProduct = response.data.find(p => p._id === id);
        setProduct(foundProduct);
      })
      .catch(error => console.error('Error fetching product details:', error));
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please sign in to add items to your cart.');
      return;
    }

    try {
      await addToCart(product._id, quantity);
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img src={product.image} alt={product.name} className="w-full h-auto" />
        </div>
        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-xl mb-4">${product.price.toFixed(2)}</p>
          <p className="mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-2">Quantity:</label>
            <input 
              type="number" 
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              className="border rounded px-2 py-1 w-16"
            />
          </div>
          <button 
            onClick={handleAddToCart}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;