import { useState } from 'react';

import { useAuthStore } from '../store/useAuthStore';
import { addNewAppointment } from '../api/craeteNewAppointment';

export const useAddNewAppointment = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuthStore();

  const saveAppointment = async (payload: any) => {
    setLoading(true);
    try {
      const result = await addNewAppointment(payload, token);
      return { success: true, data: result };
    } catch (error) {
      console.error("Error saving appointment:", error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return { saveAppointment, loading };
};