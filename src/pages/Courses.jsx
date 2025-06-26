import { useParams } from 'react-router-dom';
import { useState } from 'react';
import CategoryTabs from '../components/CategoryTabs';
import FilterBar from '../components/FilterBar';
import CourseListView from '../components/CourseListView';
import useCourses from '../hooks/useCourses';
import useFilteredCount from '../hooks/useFilteredCount';

function CoursesPage() {
    const { category = 'all' } = useParams();
    const [filters, setFilters] = useState({ difficulty: [], discounted: false });
    const [activePage, setActivePage] = useState(1);

    const filterOptions = {
        category,
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

    if (coursesError || countError) {
        return <div>에러가 발생했습니다: {coursesError?.message || countError?.message}</div>;
    }

    if (coursesLoading || countLoading) {
        return <div>로딩 중입니다...</div>;
    }

    return (
        <>
            <CategoryTabs />
            <FilterBar filters={filters} onFilterChange={handleFilterChange} />
            <CourseListView
                courses={courses}
                totalCourseCount={filteredCount}
                activePage={activePage}
                setActivePage={setActivePage}
            />
        </>
    );
}

export default CoursesPage;