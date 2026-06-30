import axios from 'axios';
import { LoginRequest, LoginResponse } from '../types/auth.types';

const API_URL = 'http://192.168.0.100:5294/beratenApi/ClientApp/Login';

export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  console.log("--- Login Attempt Started ---");
  console.log("Target URL:", API_URL);
  console.log("Sending Data:", credentials);

  try {
    const response = await axios.post<LoginResponse>(API_URL, credentials);
    
    console.log("--- Login Success ---");
    console.log("Response Data:", response.data);
    
    return response.data;
  } catch (error: any) {
    console.log("--- Login Failed ---");
    
    if (error.response) {
      // সার্ভার রেসপন্স দিয়েছে (যেমন: 400, 401, 500 এরর)
      console.log("Server Error Data:", error.response.data);
      console.log("Status Code:", error.response.status);
    } else if (error.request) {
      // রিকোয়েস্ট পাঠানো হয়েছে কিন্তু সার্ভার থেকে কোনো রেসপন্স আসেনি (Network Error)
      console.log("No response received from server. Check IP, Firewall, or Server Status.");
      console.log("Request Object:", error.request);
    } else {
      // রিকোয়েস্ট সেটআপের সময় এরর হয়েছে
      console.log("Axios Setup Error:", error.message);
    }
    
    throw error; // এররটি আবার থ্রো করা হচ্ছে যাতে আপনার useMutation এটি ধরতে পারে
  }
};