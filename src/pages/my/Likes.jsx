import { useAuth } from '../../contexts/AuthContext';
import { Title, Text, Container } from '@mantine/core';
import CourseListView from '../../components/CourseListView';
import useCourses from '../../hooks/useCourses';
import { DEFAULT_COURSE_QUERY } from '../../utils/constants'
import { useState } from 'react';

function Likes() {
    const { user } = useAuth();
    const [activePage, setActivePage] = useState(1);

    const wishlistCodes = user?.wishlist ?? [];

    const { courses, loading, error } = useCourses(DEFAULT_COURSE_QUERY);

    const wishlistCourses = courses.filter(course =>
        wishlistCodes.includes(course.courseCode)
    );

    if (loading) {
        return <Text>로딩 중입니다...</Text>;
    }

    if (error) {
        return <Text>에러가 발생했습니다: {error.message}</Text>;
    }

    return (
        <Container size="xl" py="md">
            <Title order={2} mb="sm">좋아요한 강의</Title>

            {wishlistCourses.length === 0 ? (
                <Text size="sm" c="dimmed">
                    좋아요한 강의가 없습니다.
                </Text>
            ) : (
                <CourseListView
                    courses={wishlistCourses}
                    totalCourseCount={wishlistCourses.length}
                    activePage={activePage}
                    setActivePage={setActivePage}
                />
            )}
        </Container>
    );
}

export default Likes;