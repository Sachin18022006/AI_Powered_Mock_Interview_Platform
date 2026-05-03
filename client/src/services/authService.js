import API from './api.js';

// Register
const register = async (name, email, password) => {
  const response = await API.post('/auth/register', {
    name,
    email,
    password
  });
  return response.data.data;
};

// Login
const emailLogin = async (email, password) => {
  const response = await API.post('/auth/login', {
    email,
    password
  });
  return response.data.data;
};

// Get Profile
const getMe = async () => {
  const response = await API.get('/auth/me');
  return response.data.data;
};

// Logout
const logout = async () => {
  const response = await API.post('/auth/logout');
  return response.data;
};

export { register, emailLogin, getMe, logout };