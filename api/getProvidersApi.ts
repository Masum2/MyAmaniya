import axios from 'axios';
import Constants from 'expo-constants';

const apiClient = axios.create({

  baseURL: `${Constants.expoConfig?.extra?.apiUrl}/beratenApi/ClientApp`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProviders = async (token: string | null) => {
  try {
    const response = await apiClient.get('/GetProviders', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching providers:", error.response?.status || error.message);
    throw error;
  }
};