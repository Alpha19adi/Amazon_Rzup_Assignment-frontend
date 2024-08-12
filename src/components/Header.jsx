/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const { user, logout } = useAuth(); 
  
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Amazon Clone</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/cart" className="hover:text-gray-300">Cart</Link></li>
            {user ? (
              <>
                <li><Link to="/profile" className="hover:text-gray-300">Profile</Link></li>
                <li><button onClick={handleLogout} className="hover:text-gray-300">Sign Out</button></li>
              </>
            ) : (
              <>
                <li><Link to="/signin" className="hover:text-gray-300">Sign In</Link></li>
                <li><Link to="/signup" className="hover:text-gray-300">Sign Up</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;