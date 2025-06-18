import CategoryTabs from "../components/CategoryTabs";
import FilterBar from "../components/FilterBar";
import CourseCard from "../components/CourseCard";
import courses from '../data/courses.json';
import { Container, Grid } from '@mantine/core';

const Home = () => {
    return (
        <>
            <CategoryTabs />
            <FilterBar />
            <Container size="xl" py="md">
                <Grid gutter="lg">
                    {courses.map((course) => (
                        <Grid.Col
                            key={course.courseCode}
                            span={2.4}
                            style={{ maxWidth: '100%' }}
                        >
                            <CourseCard {...course} />
                        </Grid.Col>
                    ))}
                </Grid>
            </Container>
        </>
    );
}

export default Home;