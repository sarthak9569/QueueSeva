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

const initialPrescriptions = [
  { id: 1, patientName: 'John Doe', userId: '1', tokenNumber: '101', date: Date.now() - 3600000, medicines: 'Paracetamol 500mg' },
  { id: 2, patientName: 'Alice Green', userId: '1', tokenNumber: '103', date: Date.now() - 600000, medicines: 'Ibuprofen 400mg' },
  { id: 3, patientName: 'Jane Smith', userId: '2', tokenNumber: '102', date: Date.now() - 1800000, medicines: 'Amoxicillin 250mg' },
];

export const QueueProvider = ({ children }) => {
  const { user } = useAuth();
  
  // Initial mocked data so dashboard isn't empty initially.
  // In a real app this would just be an empty array [] filled by an API call
  const [tokens, setTokens] = useState(initialTokens);
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);

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
    const targetToken = tokens.find(t => t.tokenNumber === tokenNumber || String(t.id) === tokenNumber);
    
    if (!targetToken) {
      throw new Error('Token not found');
    }

    setTokens((prev) => prev.map(token => {
      if (token.tokenNumber === tokenNumber || String(token.id) === tokenNumber) {
        return { ...token, status: newStatus };
      }
      return token;
    }));
  };

  const addPrescription = async (tokenNumber, medicines) => {
    // Find matching token to grab patient details
    const targetToken = tokens.find(t => t.tokenNumber === tokenNumber || String(t.id) === tokenNumber);
    
    if (!targetToken) {
      throw new Error('Cannot write prescription for a non-existent token.');
    }

    const newPrescription = {
      id: Date.now(),
      patientName: targetToken.patientName,
      userId: targetToken.userId,
      tokenNumber: targetToken.tokenNumber,
      date: Date.now(),
      medicines: medicines
    };

    setPrescriptions(prev => [...prev, newPrescription]);
    return newPrescription;
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
    stats,
    prescriptions,
    addPrescription
  };

  return (
    <QueueContext.Provider value={value}>
      {children}
    </QueueContext.Provider>
  );
};
