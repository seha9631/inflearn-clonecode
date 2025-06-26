import { useEffect, useState } from 'react';
import { ITEMS_PER_PAGE } from '../utils/constants';
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
    const [totalCourseCount, setTotalCourseCount] = useState(0);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            setError(null);

            let dataQuery = supabase.from('courses').select('*', { count: 'exact' });
            let countQuery = supabase.from('courses').select('*', { count: 'exact', head: true });

            if (category && category !== 'all') {
                dataQuery = dataQuery.eq('category', category);
                countQuery = dataQuery.eq('category', category);
            }

            if (searchInput) {
                dataQuery = dataQuery.or(`title.ilike.%${searchInput}%,instructor.ilike.%${searchInput}%`);
                countQuery = dataQuery.or(`title.ilike.%${searchInput}%,instructor.ilike.%${searchInput}%`);
            }

            if (difficulty.length > 0) {
                dataQuery = dataQuery.in('level', difficulty);
                countQuery = dataQuery.in('level', difficulty);
            }

            if (discounted) {
                dataQuery = dataQuery.gt('discount_rate', 0);
                countQuery = dataQuery.gt('discount_rate', 0);
            }

            dataQuery = dataQuery.order(sortBy, { ascending: sortOrder === 'asc' });

            const from = (page - 1) * perPage;
            const to = from + perPage - 1;
            dataQuery = dataQuery.range(from, to);

            const { data, error } = await dataQuery;
            console.log(error)

            const { count } = await countQuery;

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