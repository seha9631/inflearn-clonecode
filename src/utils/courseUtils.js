import allCourses from '../data/courses.json';

export function getCoursesByCodes(codes) {
    return codes
        .map((code) => allCourses.find((c) => c.courseCode === code))
        .filter(Boolean);
}