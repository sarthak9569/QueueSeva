import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would validate the token with the backend here
    let isMounted = true;
    
    const initAuth = async () => {
      // Simulate API call using setTimeout wrapped in a promise
      await new Promise(resolve => setTimeout(resolve, 0));
      
      if (!isMounted) return;
      
      if (token) {
        setUser({ id: '1', role: 'admin' }); 
        localStorage.setItem('token', token);
      } else {
        setUser(null);
        localStorage.removeItem('token');
      }
      setLoading(false);
    };

    initAuth();
    
    return () => {
      isMounted = false;
    };
  }, [token]);

  const login = (newToken, userData) => {
    setToken(newToken);
    if (userData) {
      setUser(userData);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
