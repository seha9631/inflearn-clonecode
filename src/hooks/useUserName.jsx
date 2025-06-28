import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

function useUserName() {
    const [name, setName] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserName = async () => {
            setLoading(true);
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError || !user) {
                setError(userError || new Error('사용자 없음'));
                setLoading(false);
                return;
            }

            const { data: profile, error: profileError } = await supabase
                .from('user_profiles')
                .select('name')
                .eq('id', user.id)
                .single();

            if (profileError) {
                setError(profileError);
            } else {
                setName(profile.name);
            }

            setLoading(false);
        };

        fetchUserName();
    }, []);

    return { name, loading, error };
}

export default useUserName;