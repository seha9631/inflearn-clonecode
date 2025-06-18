import { useState } from 'react';
import CategoryTabs from "../components/CategoryTabs";
import FilterBar from "../components/FilterBar";
import CourseCard from "../components/CourseCard";
import courses from '../data/courses.json';
import { Container, Grid, Pagination, Center } from '@mantine/core';

const ITEMS_PER_PAGE = 40;

const Home = () => {
    const [activePage, setActivePage] = useState(1);

    const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentCourses = courses.slice(startIndex, endIndex);

    const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);

    return (
        <>
            <CategoryTabs />
            <FilterBar />
            <Container size="xl" py="md">
                <Grid gutter="lg">
                    {currentCourses.map((course) => (
                        <Grid.Col
                            key={course.courseCode}
                            span={2.4}
                            style={{ maxWidth: '100%' }}
                        >
                            <CourseCard {...course} />
                        </Grid.Col>
                    ))}
                </Grid>

                <Center mt="xl">
                    <Pagination
                        value={activePage}
                        onChange={setActivePage}
                        total={totalPages}
                        color='#00c471'
                        withEdges
                    />
                </Center>
            </Container>
        </>
    );
};

export default Home;