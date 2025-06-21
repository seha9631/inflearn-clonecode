import { useState } from 'react';
import CategoryTabs from '../components/CategoryTabs';
import FilterBar from '../components/FilterBar';
import CourseListView from '../components/CourseListView';
import courses from '../data/courses.json';

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

    return (
        <>
            <CategoryTabs />
            <FilterBar onFilterChange={handleFilterChange} />
            <CourseListView
                courses={filteredCourses}
                activePage={activePage}
                setActivePage={setActivePage}
            />
        </>
    );
};

export default Home;