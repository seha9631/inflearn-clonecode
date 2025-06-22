import useCourseLecture from '../../hooks/useCourseLecture'
import useEnrollmentCheck from '../../hooks/useEnrollmentCheck'
import useAutoHideSidebar from '../../hooks/useAutoHideSidebar'
import usePanel from '../../hooks/usePanel'
import { Box, Text, Stack } from '@mantine/core'
import LectureBackLink from './LectureBackLink';
import LectureSidebar from './LectureSidebar'
import CurriculumPanel from './CurriculumPanel'
import LectureNavigation from './LectureNavigation'

function LecturePlayerPage() {
    const { course, lecture, courseCode, lectureCode } = useCourseLecture();
    const isEnrolled = useEnrollmentCheck(courseCode);
    const { show: showSidebar, handleMouseMove } = useAutoHideSidebar(isEnrolled);
    const { activePanel, openPanel, closePanel } = usePanel();

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
                    course={course}
                    isEnrolled={isEnrolled}
                />
            </Box>

            <Box style={{ height: 60, flexShrink: 0 }}>
                <LectureNavigation course={course} currentLectureCode={lectureCode} />
            </Box>
        </Stack>
    );
}

export default LecturePlayerPage;