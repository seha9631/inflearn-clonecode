import { useParams } from 'react-router-dom';
import useCourse from './useCourse';
import useSections from './useSections';
import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

function useCourseLecture() {
    const { courseCode, lectureCode } = useParams();

    const { course, loading: courseLoading, error: courseError } = useCourse(courseCode);
    const { sections, loading: sectionsLoading, error: sectionsError } = useSections(courseCode);

    const [lecture, setLecture] = useState(null);
    const [lectureError, setLectureError] = useState(null);
    const [loadingLecture, setLoadingLecture] = useState(true);

    useEffect(() => {
        const fetchLecture = async () => {
            if (!sections.length || !lectureCode) return;

            setLoadingLecture(true);
            setLectureError(null);

            for (const section of sections) {
                const { data, error } = await supabase
                    .from('lectures')
                    .select('*')
                    .eq('section_id', section.id)
                    .eq('lecture_code', lectureCode)
                    .maybeSingle();

                if (error) {
                    setLectureError(error.message);
                    setLecture(null);
                    setLoadingLecture(false);
                    return;
                }

                if (data) {
                    setLecture(data);
                    setLoadingLecture(false);
                    return;
                }
            }

            setLecture(null);
            setLectureError('해당 강의를 찾을 수 없습니다.');
            setLoadingLecture(false);
        };

        fetchLecture();
    }, [sections, lectureCode]);

    const loading = courseLoading || sectionsLoading || loadingLecture;
    const error = courseError || sectionsError || lectureError;

    return {
        course,
        lecture,
        courseCode,
        lectureCode,
        loading,
        error,
    };
}

export default useCourseLecture;