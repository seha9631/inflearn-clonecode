import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';
import { camelize } from '../utils/camelize'

export default function useCartItems() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            setLoading(true);
            setError(null);

            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (!user || userError) {
                setError(userError || new Error('로그인된 사용자가 없습니다'));
                setLoading(false);
                return;
            }

            const { data, error: cartError } = await supabase
                .from('user_course_meta')
                .select(`
                    course_code,
                    courses (
                        title,
                        thumbnail_url,
                        original_price,
                        discount_price,
                        discount_rate
                    )
                `)
                .eq('user_id', user.id)
                .eq('type', 'cart');

            if (cartError) {
                setError(cartError);
            } else {
                setCartItems(camelize(data));
            }

            setLoading(false);
        };

        fetchCartItems();
    }, []);

    return { cartItems, loading, error };
}