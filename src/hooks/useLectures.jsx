import { useEffect, useState } from 'react';
import { camelize } from '../utils/camelize';
import supabase from '../lib/supabaseClient';

function useLectures(sectionId) {
    const [lectures, setLectures] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!sectionId) return;

        const fetchLectures = async () => {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from('lectures')
                .select('title, video_url, video_duration')
                .eq('section_id', sectionId)
                .order('title', { ascending: true });

            if (error) {
                setError(error.message);
            } else {
                setLectures(camelize(data));
            }

            setLoading(false);
        };

        fetchLectures();
    }, [sectionId]);

    return { lectures, loading, error };
}

export default useLectures;