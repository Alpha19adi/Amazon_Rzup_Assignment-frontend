import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Adjust this to your backend URL

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const signUp = (userData) => api.post('/api/auth/signup', userData);
export const signIn = (credentials) => api.post('/api/auth/signin', credentials);
export const getProfile = (userId) => api.get('/api/users/profile',{userId});
export const updateProfile = (userData) => api.put('/api/users/profile', userData);
export const getProducts = () => api.get('/api/products');
export const getCart = (userId) =>  api.post('/api/cart',{ userId });
export const addToCart = (productId, quantity, userId) => api.post('/api/cart/items', { productId, quantity, userId });
export const updateCartItem = (productId, quantity) => api.put(`/api/cart/items/${productId}`, { quantity });
export const removeFromCart = (productId) => api.delete(`/api/cart/items/${productId}`);