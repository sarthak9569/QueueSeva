import axiosInstance from './axiosInstance';

export const queueAPI = {
  generateToken: async (patientData) => {
    const response = await axiosInstance.post('/queue/token', patientData);
    return response.data;
  },
  
  getLiveQueue: async () => {
    const response = await axiosInstance.get('/queue/live');
    return response.data;
  },
  
  getTokenHistory: async (userId) => {
    const response = await axiosInstance.get('/queue/history', { params: { userId } });
    return response.data;
  },
  
  updateTokenStatus: async (tokenId, status) => {
    const response = await axiosInstance.patch(`/queue/token/${tokenId}`, { status });
    return response.data;
  }
};
