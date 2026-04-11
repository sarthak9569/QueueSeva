import axiosInstance from './axiosInstance';

export const authAPI = {
  login: async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  },
  
  signup: async (userData) => {
    const response = await axiosInstance.post('/auth/signup', userData);
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  }
};
