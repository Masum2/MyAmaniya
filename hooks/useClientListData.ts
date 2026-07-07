// hooks/useClientData.ts
import { useQuery } from '@tanstack/react-query';

import { useAuthStore } from '../store/useAuthStore';
import {  fetchClients } from '../api/GetClientsApi';


export const useClientList = () => {
  const token = useAuthStore((state) => state.token);
  return useQuery({
    queryKey: ['clients'],
    queryFn: () => fetchClients(token),
  });
};

