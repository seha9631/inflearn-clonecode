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

    if (coursesError || countError) {
        return <Error message={coursesError?.message || countError?.message} />;
    }

    if (coursesLoading || countLoading) {
        return <div>로딩 중입니다...</div>;
    }

    return (
        <>
            <FilterBar onFilterChange={handleFilterChange} />
            <CourseListView
                title={`‘${keyword}’ 검색 결과`}
                description={`${filteredCount}개의 강의가 검색되었습니다.`}
                courses={courses}
                totalCourseCount={filteredCount}
                activePage={activePage}
                setActivePage={setActivePage}
            />
        </>
    );

};

export default Search;