import allCourses from '../data/courses.json';

export function getCoursesByCodes(codes) {
    return codes
        .map((code) => {
            const course = allCourses.find((c) => c.courseCode === code);
            if (!course) return null;
            return {
                id: course.courseCode,
                title: course.title,
                image: course.thumbnail,
                price: course.discountPrice || course.originalPrice,
                originalPrice: course.discountPrice ? course.originalPrice : null,
            };
        })
        .filter(Boolean);
}