import { Appointment } from "../types/getAppointmentANdClient";


export const getAppointments = async (clientId: number | string, token: string | null): Promise<Appointment[]> => {
  const API_URL = `http://192.168.0.100:5294/beratenApi/ClientApp/GetAppointMentList?ClientId=${clientId}`;

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