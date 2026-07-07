import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { persist, createJSONStorage } from 'zustand/middleware';

// ইউজার টাইপ
interface User {
  fullName: string;
  loginId: string;
  userId: number;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (data: { token: string; user: User }) => Promise<void>;
  logout: () => Promise<void>;
}

// SecureStore wrapper বানানো হলো
const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await SecureStore.deleteItemAsync(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: async (data) => {
        await secureStorage.setItem('authToken', data.token);
        set({ token: data.token, user: data.user });
      },
      logout: async () => {
        await secureStorage.removeItem('authToken');
        set({ token: null, user: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStorage), 
    }
  )
);
