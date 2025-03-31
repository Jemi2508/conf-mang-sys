import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
const API_BASE_URL = 'http://localhost:5000'; // Ensure this matches your backend port


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
       // Verify token and fetch user
      const verifyToken = async () => {
          try {
              const response = await axios.get(`${API_BASE_URL}/api/users/me`, {  // Assuming you have a /me endpoint
                  headers: { Authorization: `Bearer ${storedToken}` }
              });
              setUser(response.data); // Set user data
          } catch (error) {
              console.error("Token verification failed:", error);
               localStorage.removeItem('token');
              setToken(null);
              setUser(null);
              navigate('/login');  // Redirect to login
          } finally {
              setLoading(false);
          }
      };
    } else {
         setLoading(false);
    }
}, [token, navigate]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setUser({ userId: response.data.userId, role: response.data.role });
       navigate('/conferences');

    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const register = async (email, password, role = 'attendee') => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, { email, password, role });
       localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setUser({ userId: response.data.userId, role: response.data.role });
      navigate('/conferences');
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
     navigate('/login');
  };

  const isAuthenticated = !!token;

  const contextValue = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated,
    loading
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
