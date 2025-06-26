import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import FilterBar from '../components/FilterBar';
import CourseListView from '../components/CourseListView';
import useCourses from '../hooks/useCourses';

const Search = () => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('s')?.toLowerCase() || '';

    const [filters, setFilters] = useState({ difficulty: [], discounted: false });
    const [activePage, setActivePage] = useState(1);

    const { courses, totalCourseCount, loading, error } = useCourses({
        searchInput: keyword,
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
            <FilterBar onFilterChange={handleFilterChange} />
            <CourseListView
                title={`‘${keyword}’ 검색 결과`}
                description={`${totalCourseCount}개의 강의가 검색되었습니다.`}
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

export default Search;