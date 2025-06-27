import { useEffect, useState } from 'react';
import { camelize } from '../utils/camelize';
import supabase from '../lib/supabaseClient';

function useCourse(courseCode) {
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!courseCode) return;

        const fetchCourse = async () => {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from('courses')
                .select('*')
                .eq('course_code', courseCode)
                .single();

            if (error) {
                setError(error.message);
            } else {
                setCourse(camelize(data));
            }

            setLoading(false);
        };

        fetchCourse();
    }, [courseCode]);

    return { course, loading, error };
}

export default useCourse;