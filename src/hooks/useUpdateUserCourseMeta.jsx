import { useState } from 'react';
import supabase from '../lib/supabaseClient';

export default function useUpdateUserCourseMeta() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addCourseMeta = async ({ userId, courseCode, type }) => {
        setLoading(true);
        setError(null);

        const { error } = await supabase
            .from('user_course_meta')
            .insert([{ user_id: userId, course_code: courseCode, type }]);

        setLoading(false);
        if (error) {
            setError(error);
            return false;
        }
        return true;
    };

    const removeCourseMeta = async ({ userId, courseCodes, type }) => {
        setLoading(true);
        setError(null);

        const { error } = await supabase
            .from('user_course_meta')
            .delete()
            .in('course_code', courseCodes)
            .eq('user_id', userId)
            .eq('type', type);

        setLoading(false);
        if (error) {
            setError(error);
            return false;
        }
        return true;
    };

    return {
        addCourseMeta,
        removeCourseMeta,
        loading,
        error,
    };
}