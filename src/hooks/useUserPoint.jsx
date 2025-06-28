import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

export default function useUserPoint() {
    const [point, setPoint] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserPoint = async () => {
            setLoading(true);
            setError(null);

            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (!user || userError) {
                setError(userError || new Error('로그인된 사용자가 없습니다.'));
                setLoading(false);
                return;
            }

            const { data: profile, error: profileError } = await supabase
                .from('user_profiles')
                .select('point')
                .eq('id', user.id)
                .single();

            if (profileError) {
                setError(profileError);
            } else {
                setPoint(profile.point || 0);
            }

            setLoading(false);
        };

        fetchUserPoint();
    }, []);

    return { point, loading, error };
}