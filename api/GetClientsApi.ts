import axios from 'axios';

const BASE_URL = "http://192.168.0.100:5294/beratenApi/ClientApp";

// Axios Instance তৈরি করুন যাতে বারবার হেডার না লিখতে হয়
const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchClients = async (token: string | null) => {
  try {
    const response = await api.get('/GetClients', {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      }
    });
    return response.data; // Axios অটোমেটিক JSON পার্স করে
  } catch (error: any) {
    console.error("Fetch Clients Error:", error.response?.data || error.message);
    throw error;
  }
};

