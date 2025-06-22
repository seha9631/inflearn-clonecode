import { useAuth } from '../../contexts/AuthContext';
import courses from '../../data/courses.json';
import { Title, Text, Container, Grid } from '@mantine/core';
import PurchasedCourseCard from '../../components/PurchasedCourseCard';

function Courses() {
    const { user } = useAuth();
    const enrolledCodes = user?.enrolled ?? [];

    const enrolledCourses = courses.filter(course =>
        enrolledCodes.includes(course.courseCode)
    );

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