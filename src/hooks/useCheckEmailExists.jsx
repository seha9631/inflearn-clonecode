import { useState } from 'react';
import supabase from '../lib/supabaseClient';

function useCheckEmailExists() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const checkEmail = async (email) => {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
            .from('user_profiles')
            .select('id')
            .eq('email', email.trim().toLowerCase())
            .maybeSingle();

        setLoading(false);

        if (error) {
            setError(error.message);
            return false;
        }

        return !!data;
    };

    return { loading, error, checkEmail };
}

export default useCheckEmailExists;