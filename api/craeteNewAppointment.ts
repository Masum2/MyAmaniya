import axios from 'axios';

// apiClient যদি আগেই তৈরি থাকে, তবে সেটি ব্যবহার করুন
const apiClient = axios.create({
  baseURL: 'http://192.168.0.100:5294/beratenApi/ClientApp',
});

export const addNewAppointment = async (payload: any, token: string | null) => {
  const response = await apiClient.post('/AddNewAppointment', payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};