import axiosInstance from './axiosInstance';

export const prescriptionAPI = {
  getPrescriptions: async () => {
    const response = await axiosInstance.get('/prescriptions');
    return response.data;
  },
  
  addPrescription: async (data) => {
    const response = await axiosInstance.post('/prescriptions', data);
    return response.data;
  },
  
  getPrescriptionById: async (id) => {
    const response = await axiosInstance.get(`/prescriptions/${id}`);
    return response.data;
  }
};
