import { useState } from 'react';
import CategoryTabs from '../components/CategoryTabs';
import FilterBar from '../components/FilterBar';
import CourseListView from '../components/CourseListView';
import useCourses from '../hooks/useCourses';

const Home = () => {
    const [filters, setFilters] = useState({
        difficulty: [],
        discounted: false,
    });
    const [activePage, setActivePage] = useState(1);

    const { courses, totalCourseCount, loading, error } = useCourses({
        category: 'all',
        difficulty: filters.difficulty,
        discounted: filters.discounted,
        page: activePage,
    });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setActivePage(1);
    };

    console.log(courses)

    return (
        <>
            <CategoryTabs />
            <FilterBar onFilterChange={handleFilterChange} />
            <CourseListView
                courses={courses}
                loading={loading}
                error={error}
                totalCourseCount={totalCourseCount}
                activePage={activePage}
                setActivePage={setActivePage}
            />
        </>
    );
};

export default Home;