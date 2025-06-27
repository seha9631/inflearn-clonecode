import useEnrollmentCheck from '../../hooks/useEnrollmentCheck'
import useAutoHideSidebar from '../../hooks/useAutoHideSidebar'
import usePanel from '../../hooks/usePanel'
import { Box, Text, Stack } from '@mantine/core'
import LectureBackLink from './LectureBackLink';
import LectureSidebar from './LectureSidebar'
import CurriculumPanel from './CurriculumPanel'
import LectureNavigation from './LectureNavigation'
import useCourse from '../../hooks/useCourse';
import useSections from '../../hooks/useSections';
import useLectures from '../../hooks/useLectures';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

function LecturePlayerPage() {
    const { courseCode, lectureCode } = useParams();
    const isEnrolled = useEnrollmentCheck(courseCode);

    const { course, loading: courseLoading, error: courseError } = useCourse(courseCode);
    const { sections, loading: sectionsLoading, error: sectionsError } = useSections(courseCode);
    const sectionIds = useMemo(() => sections.map(section => section.id), [sections]);
    const { lectures, loading: lecturesLoading, error: lecturesError } = useLectures(sectionIds);
    const lecture = lectures.find(lec => lec.lectureCode === lectureCode);

    const { show: showSidebar, handleMouseMove } = useAutoHideSidebar(isEnrolled);
    const { activePanel, openPanel, closePanel } = usePanel();

    if (courseError || sectionsError || lecturesError) {
        return <div>에러가 발생했습니다: {courseError?.message || sectionsError?.message || lecturesError?.message}</div>;
    }

    if (courseLoading || sectionsLoading || lecturesLoading) {
        return <div>로딩 중입니다...</div>;
    }

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
        <Stack onMouseMove={handleMouseMove} style={{ height: '100vh', background: 'black' }} gap={0}>
            <Box style={{ height: 'calc(100vh - 60px)', position: 'relative' }}>
                {showSidebar && <LectureBackLink courseCode={courseCode} />}

                <Box style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                }}>
                    <video
                        src={lecture.videoUrl}
                        controls
                        autoPlay
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            backgroundColor: 'black',
                        }}
                    />
                </Box>

                <LectureSidebar show={showSidebar} onPanelOpen={openPanel} />

                <CurriculumPanel
                    opened={activePanel === 'curriculum'}
                    onClose={closePanel}
                    courseCode={courseCode}
                    sections={sections}
                    lectures={lectures}
                    isEnrolled={isEnrolled}
                />
            </Box>

            <Box style={{ height: 60, flexShrink: 0 }}>
                <LectureNavigation
                    courseCode={courseCode}
                    lectures={lectures}
                    currentLectureCode={lectureCode}
                />
            </Box>
        </Stack>
    );
}

export default LecturePlayerPage;