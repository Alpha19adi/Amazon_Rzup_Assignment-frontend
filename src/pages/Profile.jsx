/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getProfile, updateProfile } from '../services/api';

function Profile() {
  const { user, login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfile({ name, email });
      login(response.data, localStorage.getItem('token'));
      setMessage('Profile updated successfully');
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred while updating the profile');
    }
  };

  if (!user) return <p>Please sign in to view your profile.</p>;

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;