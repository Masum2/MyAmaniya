export const getAppointments = async (clientId: number | string, token: string | null) => {
  // আপনার API এন্ডপয়েন্ট
  const API_URL = `http://192.168.0.100:5294/beratenApi/ClientApp/GetAppointMentList?ClientId=${clientId}`;

  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error('Failed to fetch');
  return await response.json();
};