import { useState, useEffect } from 'react';
import { getProviders } from '../api/getProvidersApi';


export const useProviders = (token: string | null) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      console.log("Token is missing");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const result = await getProviders(token);
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { data, loading };
};