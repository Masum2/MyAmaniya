import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../store/useAuthStore';
import { getAppointments } from '../api/getAppointmentApi';
import { Appointment } from '../types/getAppointmentANdClient';


export const useAppointments = (clientId?: number | string) => {
  const token = useAuthStore((state) => state.token);
  
  return useQuery<Appointment[], Error>({ 
    queryKey: ['appointments', clientId],
    queryFn: () => getAppointments(clientId!, token),
    enabled: !!clientId && !!token,
  });
};