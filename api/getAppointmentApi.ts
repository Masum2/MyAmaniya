import Constants from "expo-constants";
import { Appointment } from "../types/getAppointmentANdClient";


export const getAppointments = async (clientId: number | string, token: string | null): Promise<Appointment[]> => {
  const API_URL = `${Constants.expoConfig?.extra?.apiUrl}/beratenApi/ClientApp/GetAppointMentList?ClientId=${clientId}`;
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};