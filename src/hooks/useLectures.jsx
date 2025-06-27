import { useEffect, useState } from 'react';
import { camelize } from '../utils/camelize';
import supabase from '../lib/supabaseClient';

function useLectures(sectionIds = []) {
    const [lectures, setLectures] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!sectionIds.length) return;

        const fetchLectures = async () => {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from('lectures')
                .select('section_id, title, video_url, video_duration, lecture_code')
                .in('section_id', sectionIds)
                .order('title', { ascending: true });

            if (error) {
                setError(error.message);
            } else {
                setLectures(camelize(data));
            }

            setLoading(false);
        };

        fetchLectures();
    }, [sectionIds]);

    return { lectures, loading, error };
}

export default useLectures;