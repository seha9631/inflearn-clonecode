import { useAuth } from '../../contexts/AuthContext';
import courses from '../../data/courses.json';
import { Title, Text, Container } from '@mantine/core';
import CourseListView from '../../components/CourseListView';

function Likes() {
    const { user } = useAuth();
    const wishlistCodes = user?.wishlist ?? [];

    const wishlistCourses = courses.filter(course =>
        wishlistCodes.includes(course.courseCode)
    );

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
                    activePage={1}
                    setActivePage={() => { }}
                    showPagination={false}
                />
            )}
        </Container>
    );
}

export default Likes;