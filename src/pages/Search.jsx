import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import FilterBar from '../components/FilterBar';
import CourseListView from '../components/CourseListView';
import useCourses from '../hooks/useCourses';
import useFilteredCount from '../hooks/useFilteredCount';

const Search = () => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('s')?.toLowerCase() || '';

    const [filters, setFilters] = useState({ difficulty: [], discounted: false });
    const [activePage, setActivePage] = useState(1);

    const filterOptions = {
        searchInput: keyword,
        difficulty: filters.difficulty,
        discounted: filters.discounted,
    };

    const {
        courses,
        loading: coursesLoading,
        error: coursesError
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
            <FilterBar filters={filters} onFilterChange={handleFilterChange} />

            {coursesError || countError ? (
                <div>에러가 발생했습니다: {coursesError?.message || countError?.message}</div>
            ) : coursesLoading || countLoading ? (
                <div>로딩 중입니다...</div>
            ) : (
                <CourseListView
                    title={`‘${keyword}’ 검색 결과`}
                    description={`${filteredCount}개의 강의가 검색되었습니다.`}
                    courses={courses}
                    totalCourseCount={filteredCount}
                    activePage={activePage}
                    setActivePage={setActivePage}
                />
            )}
        </>
    );

};

export default Search;