import { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get('/auth/profile');
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for unauthorized events from axiosInstance
    const handleUnauthorized = () => {
       setUser(null);
    };
    window.addEventListener('app-unauthorized', handleUnauthorized);
    return () => window.removeEventListener('app-unauthorized', handleUnauthorized);
  }, []);

  const login = async (email, password) => {
    const response = await axiosInstance.post('/auth/login', { email, password });
    setUser(response.data);
    return response.data;
  };

  const register = async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    setUser(response.data);
    return response.data;
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
    } finally {
      setUser(null);
    }
  };

  const updateProfile = async (userData) => {
    const response = await axiosInstance.put('/auth/profile', userData);
    setUser(response.data);
    return response.data;
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
