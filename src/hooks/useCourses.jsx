import { useEffect, useState } from 'react';
import { ITEMS_PER_PAGE } from '../utils/constants';
import supabase from '../lib/supabaseClient';

function useCourses({
    category,
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
    const [totalCourseCount, setTotalCourseCount] = useState(0);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            setError(null);

            let query = supabase.from('courses').select('*', { count: 'exact' });

            if (category && category !== 'all') {
                query = query.eq('category', category);
            }

            if (searchInput) {
                query = query.or(`title.ilike.%${searchInput}%,instructor.ilike.%${searchInput}%`);
            }

            if (difficulty.length > 0) {
                query = query.in('level', difficulty);
            }

            if (discounted) {
                query = query.neq('discountRate', null);
            }

            query = query.order(sortBy, { ascending: sortOrder === 'asc' });

            const from = (page - 1) * perPage;
            const to = from + perPage - 1;
            query = query.range(from, to);

            const { count } = await supabase
                .from('courses')
                .select('*', { count: 'exact', head: true });

            const { data, error } = await query;

            if (error) {
                setError(error.message);
            } else {
                setCourses(data);
                setTotalCourseCount(count);
            }

            setLoading(false);
        };

        fetchCourses();
    }, [category, searchInput, difficulty, discounted, sortBy, sortOrder, page, perPage]);

    return { courses, totalCourseCount, loading, error };
}

export default useCourses;