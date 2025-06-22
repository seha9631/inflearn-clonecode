import { Box } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function LectureBackLink({ courseCode }) {
    const navigate = useNavigate();

    return (
        <Box
            onClick={() => navigate(`/course/${courseCode}`)}
            pos='absolute'
            top={16}
            left={16}
            bg='rgba(255, 255, 255, 0.1)'
            c='white'
            px={12}
            py={6}
            radius={8}
            fz={14}
            fw={700}
            style={{
                cursor: 'pointer',
                zIndex: 20,
            }}
        >
            과목 홈으로
        </Box>
    );
}

export default LectureBackLink;