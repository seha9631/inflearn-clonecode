import { useState } from 'react';
import supabase from '../lib/supabaseClient';

function useSignup() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const signup = async (email, password, metadata = {}) => {
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata
            },
        });

        if (error) setError(error.message);
        setLoading(false);

        return { error };
    };

    return { signup, loading, error };
}

export default useSignup;