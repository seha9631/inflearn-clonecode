import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

export default function useCouponCount() {
    const [couponCount, setCouponCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCouponCount = async () => {
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

            const { count, error: countError } = await supabase
                .from('user_coupons')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', user.id);

            if (countError) {
                setError(countError);
            } else {
                setCouponCount(count);
            }

            setLoading(false);
        };

        fetchCouponCount();
    }, []);

    return { couponCount, loading, error };
}