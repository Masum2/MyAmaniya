// api/auth.ts
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from "expo-constants";
import { LoginRequest, LoginResponse } from '../types/auth.types';

const API_URL = `${Constants.expoConfig?.extra?.apiUrl}/beratenApi/ClientApp/Login`;

export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(API_URL, credentials, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.data?.token) {
      // Token SecureStore এ রাখো
      await SecureStore.setItemAsync('authToken', response.data.token);
    }

    return response.data;
  } catch (error: any) {
    throw error;
  }
};
