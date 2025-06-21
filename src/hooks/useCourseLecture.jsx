import { useParams } from 'react-router-dom';
import courses from '../data/courses.json';

function useCourseLecture() {
    const { courseCode, lectureCode } = useParams();

    const course = courses.find((c) => c.courseCode === courseCode);
    const lecture = course?.sections
        .flatMap((section) => section.lectures)
        .find((lec) => lec.lectureCode === lectureCode);

    return { course, lecture, courseCode, lectureCode };
}

export default useCourseLecture;