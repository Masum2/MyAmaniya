import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../store/useAuthStore';
import { getAppointments } from '../api/getAppointmentApi';

export const useAppointments = (clientId: number | string) => {
  const token = useAuthStore((state) => state.token);
  return useQuery({
    queryKey: ['appointments', clientId],
    queryFn: () => getAppointments(clientId, token),
    enabled: !!clientId && !!token,
    staleTime: 0, // ডেটা সাথে সাথে রিফ্রেশ হবে
  });
};