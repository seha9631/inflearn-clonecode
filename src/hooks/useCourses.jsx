import { useEffect, useState } from 'react';
import { ITEMS_PER_PAGE } from '../utils/constants';
import { camelize } from '../utils/camelize';
import supabase from '../lib/supabaseClient';

function useCourses({
    category = 'all',
    searchInput,
    difficulty = [],
    discounted = false,
    sortBy = 'created_at',
    sortOrder = 'desc',
    page = 1,
    perPage = ITEMS_PER_PAGE,
} = {}) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            setError(null);

            let query = supabase.from('courses').select('*');

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

            query = query.order(sortBy, { ascending: sortOrder === 'asc' });

            const from = (page - 1) * perPage;
            const to = from + perPage - 1;
            query = query.range(from, to);

            const { data, error } = await query;

            if (error) {
                setError(error.message);
            } else {
                setCourses(camelize(data));
            }

            setLoading(false);
        };

        fetchCourses();
    }, [category, searchInput, difficulty, discounted, sortBy, sortOrder, page, perPage]);

    return { courses, loading, error };
}

export default useCourses;