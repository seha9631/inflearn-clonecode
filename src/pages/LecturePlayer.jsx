import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Box, Text } from '@mantine/core';
import courses from '../data/courses.json';
import { useAuth } from '../contexts/AuthContext';
import LectureSidebar from '../components/LectureSidebar';
import CurriculumPanel from '../components/CurriculumPanel';

function LecturePlayer() {
    const { courseCode, lectureCode } = useParams();
    const { user } = useAuth();

    const [showSidebar, setShowSidebar] = useState(false);
    const [activePanel, setActivePanel] = useState(null);
    const hideTimeoutRef = useRef(null);

    const course = courses.find((c) => c.courseCode === courseCode);
    const lecture = course?.sections
        .flatMap((section) => section.lectures)
        .find((lec) => lec.lectureCode === lectureCode);

    const isEnrolled = user?.enrolled?.includes(courseCode);

    useEffect(() => {
        return () => clearTimeout(hideTimeoutRef.current);
    }, []);

    const handleMouseMove = () => {
        if (!isEnrolled) return;
        setShowSidebar(true);
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = setTimeout(() => setShowSidebar(false), 2000);
    };

    const handlePanelOpen = (key) => {
        setActivePanel(key);
    };

    const handlePanelClose = () => {
        setActivePanel(null);
    };

    if (!course || !lecture) {
        return <Text>강의나 코스를 찾을 수 없습니다.</Text>;
    }

    if (!isEnrolled) {
        return (
            <Box style={{ padding: 80, textAlign: 'center' }}>
                <Text size='xl' fw={600}>수강 중인 사용자만 강의를 시청할 수 있습니다.</Text>
            </Box>
        );
    }

    return (
        <Box
            onMouseMove={handleMouseMove}
            style={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                background: 'black',
                overflow: 'hidden'
            }}
        >
            <video
                src={lecture.videoUrl}
                controls
                autoPlay
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    backgroundColor: 'black'
                }}
            />

            <LectureSidebar show={showSidebar} onPanelOpen={handlePanelOpen} />
            <CurriculumPanel opened={activePanel === 'curriculum'} onClose={handlePanelClose} course={course} isEnrolled={isEnrolled} />
        </Box>
    );
}

export default LecturePlayer;