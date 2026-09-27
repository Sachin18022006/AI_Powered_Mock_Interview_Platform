import axios from 'axios';
 
const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl || envUrl.trim() === '') {
    // If running in browser and not localhost, use relative /api
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
      return '/api';
    }
    return 'http://localhost:5000/api';
  }
  const clean = envUrl.trim().replace(/\/+$/, '');
  return clean.endsWith('/api') ? clean : `${clean}/api`;
};

const API = axios.create({
  baseURL: getBaseURL()
});

// Attach JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;