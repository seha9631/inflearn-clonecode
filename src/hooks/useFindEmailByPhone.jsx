import { useState } from 'react';
import supabase from '../lib/supabaseClient';

function useFindEmailByPhone() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const findEmailByPhone = async (phoneNumber) => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.rpc('find_id', { phone: phoneNumber });
    if (error) {
      setError(error.message);
      return null;
    }
    setLoading(false);
    return data;
  };

  return { findEmailByPhone, loading, error };
}

export default useFindEmailByPhone;