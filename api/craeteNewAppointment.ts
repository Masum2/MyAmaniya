import axios from 'axios';
import { createAppointmentPayload } from '../types/createAppointment';

// apiClient যদি আগেই তৈরি থাকে, তবে সেটি ব্যবহার করুন
const apiClient = axios.create({
  baseURL: 'http://192.168.0.100:5294/beratenApi/ClientApp',
});



export const addNewAppointment = async (payload: createAppointmentPayload, token: string | null): Promise<any> => {
  const response = await apiClient.post('/AddNewAppointment', payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};