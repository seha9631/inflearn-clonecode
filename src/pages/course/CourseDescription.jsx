import { Stack, Text, Box } from '@mantine/core';

function CourseDescription({ course, categoryLabel }) {
    return (
        <Stack gap={2}>
            <Text style={{ fontSize: 25 }}>{course.level}자를 위해 준비한</Text>
            <Text style={{ fontSize: 25 }}>{categoryLabel} 강의입니다.</Text>
            <Box
                h={800}
                p='md'
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Text style={{ fontSize: 50 }}>{course.title} 강의 소개</Text>
            </Box>
        </Stack>
    );
}

export default CourseDescription;