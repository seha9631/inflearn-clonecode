import { useParams } from 'react-router-dom';
import { useState } from 'react';
import CategoryTabs from '../components/CategoryTabs';
import FilterBar from '../components/FilterBar';
import CourseListView from '../components/CourseListView';
import useCourses from '../hooks/useCourses';

function CoursesPage() {
    const { category } = useParams();
    const [filters, setFilters] = useState({ difficulty: [], discounted: false });
    const [activePage, setActivePage] = useState(1);

    const { courses, totalCourseCount, loading, error } = useCourses({
        category: category,
        difficulty: filters.difficulty,
        discounted: filters.discounted,
        page: activePage,
    });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setActivePage(1);
    };

    return (
        <>
            <CategoryTabs />
            <FilterBar onFilterChange={handleFilterChange} />
            <CourseListView
                courses={courses}
                totalCourseCount={totalCourseCount}
                loading={loading}
                error={error}
                activePage={activePage}
                setActivePage={setActivePage}
            />
        </>
    );
}

export default CoursesPage;