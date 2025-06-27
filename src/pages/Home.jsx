import { useState } from 'react';
import { Text } from '@mantine/core';
import CategoryTabs from '../components/CategoryTabs';
import FilterBar from '../components/FilterBar';
import CourseListView from '../components/CourseListView';
import useCourses from '../hooks/useCourses';
import useFilteredCount from '../hooks/useFilteredCount';

const Home = () => {
    const [filters, setFilters] = useState({
        difficulty: [],
        discounted: false,
    });
    const [activePage, setActivePage] = useState(1);

    const filterOptions = {
        difficulty: filters.difficulty,
        discounted: filters.discounted,
    };

    const {
        courses,
        loading: coursesLoading,
        error: coursesError,
    } = useCourses({
        ...filterOptions,
        page: activePage,
    });

    const {
        filteredCount,
        loading: countLoading,
        error: countError,
    } = useFilteredCount(filterOptions);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setActivePage(1);
    };

    return (
        <>
            <CategoryTabs />
            <FilterBar filters={filters} onFilterChange={handleFilterChange} />

            {coursesError || countError ? (
                <Text>에러가 발생했습니다: {coursesError?.message || countError?.message}</Text>
            ) : coursesLoading || countLoading ? (
                <Text>로딩 중입니다...</Text>
            ) : (
                <CourseListView
                    courses={courses}
                    totalCourseCount={filteredCount}
                    activePage={activePage}
                    setActivePage={setActivePage}
                />
            )}
        </>
    );
};

export default Home;