import { Tabs, Box, Container, Text } from '@mantine/core';
import { useParams } from 'react-router-dom';
import courses from '../data/courses.json';
import { CATEGORIES } from '../utils/constants';
import CourseHeader from '../components/CourseHeader';
import CourseDescription from '../components/CourseDescription';
import CourseSidebar from '../components/CourseSidebar';
import Curriculum from '../components/Curriculum';
import DashBoard from '../components/DashBoard';
import { useAuth } from '../contexts/AuthContext'

function Course() {
    const { courseCode } = useParams();
    const course = courses.find(c => c.courseCode === courseCode);
    const { user } = useAuth();

    if (!course) {
        return <Text>강의를 찾을 수 없습니다.</Text>;
    }

    const isEnrolled = user?.enrolled?.includes(course.courseCode);

    const categoryLabel = CATEGORIES.find((cat) => cat.value === course.category)?.label ?? course.category;

    return (
        <Container size='xl'>
            <Box mb='md' bg='black'>
                <CourseHeader course={course} categoryLabel={categoryLabel} />
            </Box>

            <Tabs defaultValue={isEnrolled ? 'dashboard' : 'description'} keepMounted={false} color='#00c471' mb='md'>
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
                            <Curriculum sections={course.sections} isEnrolled={isEnrolled} />
                        </Tabs.Panel>

                        <Tabs.Panel value='dashboard'>
                            <DashBoard course={course} isEnrolled={isEnrolled} />
                        </Tabs.Panel>
                    </Box>

                    {!isEnrolled && <CourseSidebar course={course} />}
                </Box>
            </Tabs>
        </Container>
    );
}

export default Course;