import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

function useFilteredCount({
    category = 'all',
    searchInput,
    difficulty = [],
    discounted = false,
}) {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCount = async () => {
            setLoading(true);
            setError(null);

            let query = supabase.from('courses').select('*', { count: 'exact', head: true });

            if (category !== 'all') {
                query = query.eq('category', category);
            }

            if (searchInput) {
                query = query.or(`title.ilike.%${searchInput}%,instructor.ilike.%${searchInput}%`);
            }

            if (difficulty.length > 0) {
                query = query.in('level', difficulty);
            }

            if (discounted) {
                query = query.gt('discount_rate', 0);
            }

            const { count, error } = await query;

            if (error) {
                setError(error.message);
            } else {
                setCount(count);
            }

            setLoading(false);
        };

        fetchCount();
    }, [category, searchInput, difficulty, discounted]);

    return { filteredCount: count, loading, error };
}

export default useFilteredCount;