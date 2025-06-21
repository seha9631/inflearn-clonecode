import { useSearchParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Container, Grid, Center, Pagination, Title, Text } from '@mantine/core';
import CategoryTabs from '../components/CategoryTabs';
import FilterBar from '../components/FilterBar';
import CourseCard from '../components/CourseCard';
import CATEGORIES from '../data/courses.json';

const ITEMS_PER_PAGE = 40;

function Search() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('s')?.toLowerCase() || '';

    const [filters, setFilters] = useState({ difficulty: [], discounted: false });
    const [activePage, setActivePage] = useState(1);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setActivePage(1);
    };

    const filteredCourses = useMemo(() => {
        return CATEGORIES.filter((course) => {
            const matchKeyword = keyword === '' || course.title.toLowerCase().includes(keyword);
            const matchDifficulty =
                filters.difficulty.length === 0 || filters.difficulty.includes(course.level);
            const matchDiscount =
                !filters.discounted || (filters.discounted && course.discountRate);

            return matchKeyword && matchDifficulty && matchDiscount;
        });
    }, [keyword, filters]);

    const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
    const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentCourses = filteredCourses.slice(startIndex, endIndex);

    return (
        <>
            <CategoryTabs />
            <Container size='xl' py='md'>
                <Title order={2} mb='xs'>‘{keyword}’ 검색 결과</Title>
                <Text mb='md' size='sm' c='dimmed'>
                    {filteredCourses.length}개의 강의가 검색되었습니다.
                </Text>

                <FilterBar onFilterChange={handleFilterChange} />

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
}

export default Search;