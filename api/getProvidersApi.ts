import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://192.168.0.100:5294/beratenApi/ClientApp', // IP দিয়ে ট্রাই করুন
  headers: {
    'Content-Type': 'application/json',
  },
});

// টোকেন গ্রহণ করার জন্য ফাংশন আপডেট করা হলো
export const getProviders = async (token: string | null) => {
  try {
    const response = await apiClient.get('/GetProviders', {
      headers: {
        Authorization: `Bearer ${token}`, // টোকেনটি এখানে পাস করছি
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching providers:", error.response?.status || error.message);
    throw error;
  }
};