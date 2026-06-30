import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// আপনার রেসপন্স অনুযায়ী টাইপ ডিফাইন করা হলো
interface User {
  fullName: string;
  loginId: string;
  userId: number;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (data: { token: string; user: User }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      // লগইন সাকসেস হলে এই ফাংশন কল করে ডেটা সেভ করবেন
      setAuth: (data) => set({ token: data.token, user: data.user }),
      // লগআউট করার সময় এই ফাংশন কল করবেন
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage', // AsyncStorage-এ এই নামে সেভ হবে
      storage: createJSONStorage(() => AsyncStorage), 
    }
  )
);