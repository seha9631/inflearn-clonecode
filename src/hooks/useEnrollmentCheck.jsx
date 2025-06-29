import useCoursesByType from './useCoursesByType'

function useEnrollmentCheck(courseCode) {
    const { courses, loading, error } = useCoursesByType('enrolled');

    if (loading) {
        console.log('등록된 강의 정보를 가져오는 중...');
    }

    if (error) {
        console.log('등록된 강의 정보를 가져오는 중 에러 발생!');
    }

    const isEnrolled = courses.some(course => course.courseCode === courseCode);

    return isEnrolled
}

export default useEnrollmentCheck;