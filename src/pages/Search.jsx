import { useSearchParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import CategoryTabs from '../components/CategoryTabs';
import FilterBar from '../components/FilterBar';
import CourseListView from '../components/CourseListView';
import courses from '../data/courses.json';

const Search = () => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('s')?.toLowerCase() || '';

    const [filters, setFilters] = useState({ difficulty: [], discounted: false });
    const [activePage, setActivePage] = useState(1);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setActivePage(1);
    };

    const filteredCourses = useMemo(() => {
        return courses.filter((course) => {
            const matchKeyword = keyword === '' || course.title.toLowerCase().includes(keyword);
            const matchDifficulty =
                filters.difficulty.length === 0 || filters.difficulty.includes(course.level);
            const matchDiscount =
                !filters.discounted || (filters.discounted && course.discountRate);

            return matchKeyword && matchDifficulty && matchDiscount;
        });
    }, [keyword, filters]);

    return (
        <>
            <CategoryTabs />
            <CourseListView
                title={`‘${keyword}’ 검색 결과`}
                description={`${filteredCourses.length}개의 강의가 검색되었습니다.`}
                courses={filteredCourses}
                activePage={activePage}
                setActivePage={setActivePage}
            />
            <FilterBar onFilterChange={handleFilterChange} />
        </>
    );
};

export default Search;