/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

function ThankYou() {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Thank You for Your Order!</h2>
      <p className="mb-6">Your order has been successfully placed.</p>
      <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Continue Shopping
      </Link>
    </div>
  );
}

export default ThankYou;