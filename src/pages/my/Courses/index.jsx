import { useAuth } from '../../../contexts/AuthContext';
import { Title, Text, Container, Grid } from '@mantine/core';
import PurchasedCourseCard from './PurchasedCourseCard';
import useCourses from '../../../hooks/useCourses';
import { DEFAULT_COURSE_QUERY } from '../../../utils/constants'

function Courses() {
    const { user } = useAuth();
    const enrolledCodes = user?.enrolled ?? [];

    const { courses, loading, error } = useCourses(DEFAULT_COURSE_QUERY);

    const enrolledCourses = courses.filter(course =>
        enrolledCodes.includes(course.courseCode)
    );

    if (loading) {
        return <Text>로딩 중입니다...</Text>;
    }

    if (error) {
        return <Text>에러가 발생했습니다: {error.message}</Text>;
    }

    return (
        <Container size="xl" py="md">
            <Title order={2} mb="sm">구매한 강의</Title>

            {enrolledCourses.length === 0 ? (
                <Text size="sm" c="dimmed">구매한 강의가 없습니다.</Text>
            ) : (
                <Grid gutter="lg">
                    {enrolledCourses.map(course => (
                        <Grid.Col key={course.courseCode} span={2.4}>
                            <PurchasedCourseCard {...course} />
                        </Grid.Col>
                    ))}
                </Grid>
            )}
        </Container>
    );
}

export default Courses;