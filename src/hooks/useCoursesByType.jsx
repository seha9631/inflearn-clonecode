import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';
import { camelize } from '../utils/camelize';

function useUserCoursesByType(type) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            setError(null);

            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (!user || userError) {
                setError(userError || new Error('로그인된 사용자가 없습니다.'));
                setLoading(false);
                return;
            }

            const { data, error: courseError } = await supabase
                .from('user_course_meta')
                .select(`
                    course_code,
                    courses (
                        title,
                        thumbnail_url,
                        original_price,
                        discount_price,
                        discount_rate
                    )
                `)
                .eq('user_id', user.id)
                .eq('type', type);

            if (courseError) {
                setError(courseError);
            } else {
                const flattened = camelize(data).map(item => ({
                    courseCode: item.courseCode,
                    title: item.courses?.title,
                    thumbnailUrl: item.courses?.thumbnailUrl,
                    originalPrice: item.courses?.originalPrice,
                    discountPrice: item.courses?.discountPrice,
                    discountRate: item.courses?.discountRate,
                }));
                setCourses(flattened);
            }

            setLoading(false);
        };

        fetchCourses();
    }, [type]);

    return { courses, loading, error };
}

export default useUserCoursesByType;