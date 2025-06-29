import { Container, Grid, Center, Pagination } from '@mantine/core';
import CourseCard from './CourseCard';
import { ITEMS_PER_PAGE } from '../utils/constants';
import useUserCoursesByType from '../hooks/useCoursesByType';

function CourseListView({ title, description, courses, totalCourseCount, activePage, setActivePage }) {
    const totalPages = Math.ceil(totalCourseCount / ITEMS_PER_PAGE);
    const { courses: enrolledCourses } = useUserCoursesByType('enrolled');

    return (
        <Container size="xl" py="md">
            {title && <h2>{title}</h2>}
            {description && (
                <p style={{ color: '#868e96', marginBottom: 16 }}>{description}</p>
            )}

            <Grid gutter="lg">
                {courses.map((course) => (
                    <Grid.Col key={course.courseCode} span={2.4}>
                        <CourseCard
                            {...course}
                            isEnrolled={
                                enrolledCourses.some(
                                    c => c.courseCode === course.courseCode)
                            }
                        />
                    </Grid.Col>
                ))}
            </Grid>

            <Center mt="xl">
                <Pagination
                    value={activePage}
                    onChange={setActivePage}
                    total={totalPages}
                    color="#00c471"
                    withEdges
                />
            </Center>
        </Container>
    );
}

export default CourseListView;