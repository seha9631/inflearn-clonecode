import { useState } from 'react';
import CategoryTabs from '../components/CategoryTabs';
import FilterBar from '../components/FilterBar';
import CourseCard from '../components/CourseCard';
import courses from '../data/courses.json';
import { Container, Grid, Pagination, Center } from '@mantine/core';

const ITEMS_PER_PAGE = 40;

const Home = () => {
    const [filters, setFilters] = useState({ difficulty: [], discounted: false });
    const [activePage, setActivePage] = useState(1);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setActivePage(1);
    };

    const filteredCourses = courses.filter((course) => {
        const matchDifficulty =
            filters.difficulty.length === 0 || filters.difficulty.includes(course.level);
        const matchDiscount =
            !filters.discounted || (filters.discounted && course.discountRate);

        return matchDifficulty && matchDiscount;
    });

    const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
    const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentCourses = filteredCourses.slice(startIndex, endIndex);

    return (
        <>
            <CategoryTabs />
            <FilterBar onFilterChange={handleFilterChange} />
            <Container size='xl' py='md'>
                <Grid gutter='lg'>
                    {currentCourses.map((course) => (
                        <Grid.Col key={course.courseCode} span={2.4}>
                            <CourseCard {...course} />
                        </Grid.Col>
                    ))}
                </Grid>

                <Center mt='xl'>
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