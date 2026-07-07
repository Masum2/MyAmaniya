import Constants from "expo-constants";


// hooks/useTreatmentProgress.ts এর ভেতর
export const getTreatmentData = async (clientId: number | string | null, token: string | null) => {
  if (!clientId || !token) return null;
  

  const API_URL = `${Constants.expoConfig?.extra?.apiUrl}/beratenApi/ClientApp/GetProgressTreatmentsGoals?clientId=${clientId}`;
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
     console.error("API Error Status:", response.status);
     throw new Error('Failed to fetch');
  }
  
  const data = await response.json();
  // console.log("API Response Data:", data); 
  return data;
};