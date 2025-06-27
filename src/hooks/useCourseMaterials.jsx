import { useEffect, useState } from 'react';
import { camelize } from '../utils/camelize';
import supabase from '../lib/supabaseClient';

function useCourseMaterials(courseCode) {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!courseCode) return;

        const fetchMaterials = async () => {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from('course_materials')
                .select('course_code, title, material_path')
                .eq('course_code', courseCode)
                .order('title', { ascending: true });

            if (error) {
                setError(error.message);
            } else {
                setMaterials(camelize(data));
            }

            setLoading(false);
        };

        fetchMaterials();
    }, [courseCode]);

    return { materials, loading, error };
}

export default useCourseMaterials;