import { Tabs, Box, Container, Text } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { CATEGORIES } from '../../utils/constants';
import CourseHeader from './CourseHeader';
import CourseDescription from './CourseDescription';
import CourseSidebar from './CourseSidebar';
import Curriculum from './Curriculum';
import DashBoard from './DashBoard';
import useCourse from '../../hooks/useCourse';
import useSections from '../../hooks/useSections';
import useLectures from '../../hooks/useLectures';
import useEnrollmentCheck from '../../hooks/useEnrollmentCheck'
import { getTotalLectureDuration } from '../../utils/time'
import { useMemo } from 'react';

function CoursePage() {
    const { courseCode } = useParams();
    const isEnrolled = useEnrollmentCheck(courseCode);

    const { course, loading: courseLoading, error: courseError } = useCourse(courseCode);
    const { sections, loading: sectionsLoading, error: sectionsError } = useSections(courseCode);
    const sectionIds = useMemo(() => sections.map(section => section.id), [sections]);
    const { lectures, loading: lecturesLoading, error: lecturesError } = useLectures(sectionIds);

    if (courseError || sectionsError || lecturesError) {
        return <div>에러가 발생했습니다: {courseError?.message || sectionsError?.message || lecturesError?.message}</div>;
    }

    if (courseLoading || sectionsLoading || lecturesLoading) {
        return <div>로딩 중입니다...</div>;
    }

    if (!course) {
        return <Text>강의를 찾을 수 없습니다.</Text>;
    }

    const categoryLabel = CATEGORIES.find(cat => cat.value === course.category)?.label ?? course.category;
    const totalVideosCount = lectures.length;
    const totalDuration = getTotalLectureDuration(lectures);

    return (
        <Container size='xl'>
            <Box mb='md' bg='black'>
                <CourseHeader course={course} categoryLabel={categoryLabel} />
            </Box>

            <Tabs
                defaultValue={isEnrolled ? 'dashboard' : 'description'}
                keepMounted={false}
                color='#00c471'
                mb='md'
            >
                <Tabs.List>
                    {isEnrolled && <Tabs.Tab value='dashboard'>대시보드</Tabs.Tab>}
                    {!isEnrolled && <Tabs.Tab value='description'>강의 소개</Tabs.Tab>}
                    {!isEnrolled && <Tabs.Tab value='curriculum'>커리큘럼</Tabs.Tab>}
                </Tabs.List>

                <Box style={{ display: 'flex', alignItems: 'flex-start' }} mt='md'>
                    <Box style={{ flex: 1, paddingRight: 24 }}>
                        <Tabs.Panel value='description'>
                            <CourseDescription course={course} categoryLabel={categoryLabel} />
                        </Tabs.Panel>

                        <Tabs.Panel value='curriculum'>
                            <Curriculum
                                courseCode={courseCode}
                                sections={sections}
                                lectures={lectures}
                                isEnrolled={isEnrolled}
                            />
                        </Tabs.Panel>

                        <Tabs.Panel value='dashboard'>
                            <DashBoard
                                courseCode={courseCode}
                                sections={sections}
                                lectures={lectures}
                                isEnrolled={isEnrolled}
                            />
                        </Tabs.Panel>
                    </Box>

                    {!isEnrolled && (
                        <CourseSidebar
                            course={course}
                            totalVideosCount={totalVideosCount}
                            totalDuration={totalDuration}
                        />
                    )}
                </Box>
            </Tabs>
        </Container>
    );
}

export default CoursePage;