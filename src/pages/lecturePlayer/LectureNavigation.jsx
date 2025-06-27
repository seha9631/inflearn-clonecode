import { Box, Button, Group, Text } from '@mantine/core';
import { IconPlayerTrackNext, IconPlayerTrackPrev } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

function LectureNavigation({ courseCode, lectures, currentLectureCode }) {
    const navigate = useNavigate();

    const currentIndex = lectures.findIndex(lec => lec.lectureCode === currentLectureCode);

    const prevLecture = currentIndex > 0 ? lectures[currentIndex - 1] : null;
    const nextLecture = currentIndex < lectures.length - 1 ? lectures[currentIndex + 1] : null;
    const currentLecture = lectures[currentIndex];

    const goToLecture = (lecture) => {
        if (lecture) {
            navigate(`/course/${courseCode}/${lecture.lectureCode}`);
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