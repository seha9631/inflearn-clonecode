import { Title, Text, Container } from '@mantine/core';
import CourseListView from '../../components/CourseListView';
import { useState } from 'react';
import useUserCoursesByType from '../../hooks/useCoursesByType';

function Likes() {
    const [activePage, setActivePage] = useState(1);
    const { courses: wishlistCourses, loading, error } = useUserCoursesByType('wishlist');

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