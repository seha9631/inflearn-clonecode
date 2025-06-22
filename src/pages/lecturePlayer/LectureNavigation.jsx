import { Box, Button, Group, Text } from '@mantine/core';
import { IconPlayerTrackNext, IconPlayerTrackPrev } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

function LectureNavigation({ course, currentLectureCode }) {
    const navigate = useNavigate();

    const flatLectures = course.sections.flatMap(section => section.lectures);
    const currentIndex = flatLectures.findIndex(lec => lec.lectureCode === currentLectureCode);

    const prevLecture = currentIndex > 0 ? flatLectures[currentIndex - 1] : null;
    const nextLecture = currentIndex < flatLectures.length - 1 ? flatLectures[currentIndex + 1] : null;
    const currentLecture = flatLectures[currentIndex];

    const goToLecture = (lecture) => {
        if (lecture) {
            navigate(`/course/${course.courseCode}/${lecture.lectureCode}`);
        }
    };

    return (
        <Box
            bg='black'
            px={24}
            py={12}
            style={{
                display: 'flex',
                zIndex: 10,
                width: '100%',
                gap: '1rem',
            }}
        >

            <Group gap='xs'>
                <Button
                    variant='default'
                    color='dark'
                    leftSection={<IconPlayerTrackPrev size={16} />}
                    disabled={!prevLecture}
                    onClick={() => goToLecture(prevLecture)}
                >
                    이전
                </Button>

                <Button
                    variant='default'
                    color='dark'
                    rightSection={<IconPlayerTrackNext size={16} />}
                    disabled={!nextLecture}
                    onClick={() => goToLecture(nextLecture)}
                >
                    다음
                </Button>

                <Text size='sm' c='white' truncate='end' style={{ maxWidth: 400 }}>
                    {currentLecture?.title}
                </Text>
            </Group>
        </Box>
    );
}

export default LectureNavigation;