import axios from 'axios';
import Constants from 'expo-constants';


const API_URL = `${Constants.expoConfig?.extra?.apiUrl}/beratenApi/ClientApp`;

const api = axios.create({
  baseURL: API_URL,
});

export const fetchClients = async (token: string | null) => {
  try {
    const response = await api.get('/GetClients', {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      }
    });
    return response.data; 
  } catch (error: any) {
    console.error("Fetch Clients Error:", error.response?.data || error.message);
    throw error;
  }
};

