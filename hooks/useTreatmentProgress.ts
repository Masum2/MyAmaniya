import { useQuery } from "@tanstack/react-query";
import { getTreatmentDetails } from "../api/treatmentApi";

export const useTreatmentDetails = () => {
  return useQuery({
    queryKey: ["treatmentDetails"],
    queryFn: getTreatmentDetails,
  });
};