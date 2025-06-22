import { Container, Grid, Center, Pagination } from '@mantine/core';
import CourseCard from './CourseCard';
import { ITEMS_PER_PAGE } from '../utils/constants';

function CourseListView({ title, description, courses, activePage, setActivePage }) {
    const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);
    const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentCourses = courses.slice(startIndex, endIndex);

    return (
        <Container size="xl" py="md">
            {title && <h2>{title}</h2>}
            {description && (
                <p style={{ color: '#868e96', marginBottom: 16 }}>{description}</p>
            )}

            <Grid gutter="lg">
                {currentCourses.map((course) => (
                    <Grid.Col key={course.courseCode} span={2.4}>
                        <CourseCard {...course} />
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