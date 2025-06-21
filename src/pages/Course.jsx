import {
    Tabs,
    Box,
    Container,
    Title,
    Text,
    Group,
    Stack,
    Image,
    Anchor
} from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import courses from '../data/courses.json';
import { CATEGORIES } from '../utils/constants';
import CourseSidebar from '../components/CourseSidebar';
import Curriculum from '../components/Curriculum';

function Course() {
    const isEnrolled = false;
    const { id } = useParams();
    const course = courses.find(c => c.courseCode === id);
    const categoryLabel = CATEGORIES.find((cat) => cat.value === course.category)?.label ?? course.category;

    return (
        <Container size="xl">
            <Box mb="md" bg="black">
                <Group justify="space-between">
                    <Stack>
                        <Anchor
                            component={Link}
                            to={`/courses/${course.category}`}
                            underline="always"
                            c="white"
                            ml={12}
                            style={{ textDecorationColor: 'white' }}
                        >
                            {categoryLabel}
                        </Anchor>
                        <Title c="white" order={2} ml={12}>{course.title}</Title>
                        <Text c="white" size="sm" ml={16}>
                            {course.title} 강의 짧은 소개
                        </Text>
                    </Stack>
                    <Image
                        src={course.thumbnail}
                        radius="sm"
                        alt={course.title}
                        style={{ width: 300, height: 200, objectFit: 'cover' }}
                    />
                </Group>
            </Box>

            <Tabs defaultValue={isEnrolled ? 'dashboard' : 'description'} keepMounted={false} color="#00c471" mb="md">
                <Tabs.List>
                    {isEnrolled && <Tabs.Tab value="dashboard">대시보드</Tabs.Tab>}
                    <Tabs.Tab value="description">강의 소개</Tabs.Tab>
                    {!isEnrolled && <Tabs.Tab value="curriculum">커리큘럼</Tabs.Tab>}
                </Tabs.List>

                <Box style={{ display: 'flex', alignItems: 'flex-start' }} mt="md">
                    <Box style={{ flex: 1, paddingRight: 24 }}>
                        <Tabs.Panel value="description">
                            <Stack gap={2}>
                                <Text style={{ fontSize: 25 }}>{course.level}자를 위해 준비한</Text>
                                <Text style={{ fontSize: 25 }}>{categoryLabel} 강의입니다.</Text>
                                <Box
                                    h={800}
                                    p="md"
                                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <Text style={{ fontSize: 50 }}>{course.title} 강의 소개</Text>
                                </Box>
                            </Stack>
                        </Tabs.Panel>

                        <Tabs.Panel value="curriculum">
                            <Title order={3} mb="md">커리큘럼</Title>
                            <Curriculum sections={course.sections} />
                        </Tabs.Panel>

                        <Tabs.Panel value="reviews">
                            대시보드 : 나중에 강의 데이터를 업데이트하면 구현
                        </Tabs.Panel>
                    </Box>

                    <CourseSidebar course={course} />
                </Box>
            </Tabs>
        </Container>
    );
}

export default Course;