import { useEffect, useState } from 'react';
import { camelize } from '../utils/camelize';
import supabase from '../lib/supabaseClient';

function useSections(courseCode) {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!courseCode) return;

        const fetchSections = async () => {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from('sections')
                .select('id, course_code, title')
                .eq('course_code', courseCode)
                .order('title', { ascending: true });

            if (error) {
                setError(error.message);
            } else {
                setSections(camelize(data));
            }

            setLoading(false);
        };

        fetchSections();
    }, [courseCode]);

    return { sections, loading, error };
}

export default useSections;