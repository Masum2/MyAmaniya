

// hooks/useTreatmentProgress.ts এর ভেতর
export const getTreatmentData = async (clientId: number | string | null, token: string | null) => {
  if (!clientId || !token) return null;
  
  const API_URL = `http://192.168.0.100:5294/beratenApi/ClientApp/GetProgressTreatmentsGoals?clientId=${clientId}`;
  
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
  console.log("API Response Data:", data); // এখানে কি ডাটা আসছে?
  return data;
};