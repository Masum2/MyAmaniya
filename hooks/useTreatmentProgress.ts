import { useQuery } from "@tanstack/react-query";
import { getTreatmentData } from "../api/treatmentApi";

export const useTreatmentData = (clientId: number | string | null, token: string | null) => {
  return useQuery({
    queryKey: ['treatmentData', clientId],
    queryFn: () => getTreatmentData(clientId, token),
    // clientId থাকলে তবেই ডাটা ফেচ হবে
    enabled: !!clientId && !!token, 
  });
};