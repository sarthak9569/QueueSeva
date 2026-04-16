import axios from 'axios';

const API_URL = '/api'; // Using relative path because of Vite proxy

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Crucial for HTTP-only cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    
    // Dispatch custom event for toasts (to be caught by a ToastContainer)
    window.dispatchEvent(new CustomEvent('app-toast', { 
      detail: { message, type: 'error' } 
    }));

    if (error.response && error.response.status === 401) {
      // Unauthorized - session expired or not logged in
      window.dispatchEvent(new CustomEvent('app-unauthorized'));
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
