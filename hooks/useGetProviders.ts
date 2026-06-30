// src/hooks/useGetProviders.ts
import { useQuery } from '@tanstack/react-query';
import { getProviders } from '../api/getProvidersApi';
import { Provider } from '../types/createAppointment';


export const useProviders = (token: string | null) => {
  return useQuery<Provider[], Error>({
    queryKey: ['providers'],
    queryFn: () => getProviders(token),
    enabled: !!token,
  });
};