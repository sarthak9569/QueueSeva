import { createContext, useState, useContext, useMemo } from 'react';
import { useAuth } from './AuthContext';

const QueueContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useQueue = () => {
  return useContext(QueueContext);
};

const initialTokens = [
  { id: 1, tokenNumber: '101', patientName: 'John Doe', userId: '1', department: 'General', status: 'COMPLETED', issuedAt: Date.now() - 3600000 },
  { id: 2, tokenNumber: '102', patientName: 'Jane Smith', userId: '1', department: 'Pediatrics', status: 'COMPLETED', issuedAt: Date.now() - 1800000 },
  { id: 3, tokenNumber: '103', patientName: 'Alice Green', userId: '2', department: 'General', status: 'SERVING', issuedAt: Date.now() - 600000 },
  { id: 4, tokenNumber: '104', patientName: 'Bob Brown', userId: '1', department: 'Orthopedics', status: 'WAITING', issuedAt: Date.now() },
];

export const QueueProvider = ({ children }) => {
  const { user } = useAuth();
  
  // Initial mocked data so dashboard isn't empty initially.
  // In a real app this would just be an empty array [] filled by an API call
  const [tokens, setTokens] = useState(initialTokens);

  const generateToken = async (data) => {
    // Generate a unique sequential token number based on the current length
    const nextTokenNumber = 101 + tokens.length;
    
    const newToken = {
      id: Date.now(),
      tokenNumber: String(nextTokenNumber),
      patientName: data.patientName,
      department: data.department,
      userId: user?.id || 'unknown', // Tie token to logged-in user
      status: 'WAITING',
      issuedAt: Date.now()
    };

    setTokens((prev) => [...prev, newToken]);
    return newToken;
  };

  const updateTokenStatus = async (tokenNumber, newStatus) => {
    let found = false;
    setTokens((prev) => prev.map(token => {
      if (token.tokenNumber === tokenNumber || String(token.id) === tokenNumber) {
        found = true;
        return { ...token, status: newStatus };
      }
      return token;
    }));
    
    if (!found) {
      throw new Error('Token not found');
    }
  };

  // Derive stats dynamically from current tokens state
  const stats = useMemo(() => {
    return {
      total: tokens.length,
      waiting: tokens.filter(t => t.status === 'WAITING').length,
      serving: tokens.filter(t => t.status === 'SERVING').length,
      completed: tokens.filter(t => t.status === 'COMPLETED').length
    };
  }, [tokens]);

  const value = {
    tokens,
    generateToken,
    updateTokenStatus,
    stats
  };

  return (
    <QueueContext.Provider value={value}>
      {children}
    </QueueContext.Provider>
  );
};
