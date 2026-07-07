import axios from 'axios';
import { createAppointmentPayload } from '../types/createAppointment';
import Constants from 'expo-constants';


const apiClient = axios.create({
  baseURL: `${Constants.expoConfig?.extra?.apiUrl}/beratenApi/ClientApp`,
});



export const addNewAppointment = async (payload: createAppointmentPayload, token: string | null): Promise<any> => {
  const response = await apiClient.post('/AddNewAppointment', payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};