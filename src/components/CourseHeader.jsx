import { Group, Stack, Anchor, Title, Text, Image } from '@mantine/core';
import { Link } from 'react-router-dom';

function CourseHeader({ course, categoryLabel }) {
    return (
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
    );
}

export default CourseHeader;