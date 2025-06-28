import { Title, Text, Container, Grid } from '@mantine/core';
import PurchasedCourseCard from './PurchasedCourseCard';
import useUserCoursesByType from '../../../hooks/useCoursesByType';

function Courses() {
    const { courses: enrolledCourses, loading, error } = useUserCoursesByType('enrolled');

    if (loading) {
        return <Text>로딩 중입니다...</Text>;
    }

    if (error) {
        return <Text>에러가 발생했습니다: {error.message}</Text>;
    }

    return (
        <Container size='xl' py='md'>
            <Title order={2} mb='sm'>구매한 강의</Title>

            {enrolledCourses.length === 0 ? (
                <Text size='sm' c='dimmed'>구매한 강의가 없습니다.</Text>
            ) : (
                <Grid gutter='lg'>
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