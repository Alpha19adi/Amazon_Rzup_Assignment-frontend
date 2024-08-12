/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart, updateCartItem, removeFromCart } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

function Cart() {
  const { user } = useAuth();
  
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (user && user._id) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const response = await getCart(user._id);
      console.log(response);
      
      setCartItems(response.data.products);
      calculateTotal(response.data.products);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const calculateTotal = (items) => {

    const sum = items.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
    setTotal(sum);
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      await updateCartItem(productId, newQuantity);
      fetchCart();
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromCart(productId);
      fetchCart();
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.length > 0 && cartItems.map((item) => (
            <div key={item.productId._id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center">
                <img src={item.productId.image} alt={item.productId.name} className="w-16 h-16 object-cover mr-4" />
                <div>
                  <h3 className="font-semibold">{item.productId.name}</h3>
                  <p>${item.productId.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <input 
                  type="number" 
                  min="1" 
                  value={item.quantity}
                  onChange={(e) => handleUpdateQuantity(item.productId._id, parseInt(e.target.value))}
                  className="border rounded px-2 py-1 w-16 mr-4"
                />
                <button 
                  onClick={() => handleRemoveItem(item.productId._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <Link 
              to="/checkout" 
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 inline-block mt-4"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;