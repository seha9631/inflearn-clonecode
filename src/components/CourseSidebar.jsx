import {
    Box,
    Button,
    Stack,
    Text,
    Paper,
    Divider
} from '@mantine/core';
import { formatSecondsToKorean } from '../utils/timeFormat'

function CourseSidebar({ course }) {
    const isDiscounted = course.discountPrice != null && course.discountRate != null;

    const totalVideosCount = course.sections.reduce(
        (total, section) => total + section.lectures.length,
        0
    );

    const totalDuration = course.sections.reduce(
        (sum, section) => sum + section.lectures.reduce(
            (innerSum, lecture) => innerSum + lecture.videoDuration,
            0
        ),
        0
    );

    return (
        <Box
            style={{
                position: 'sticky',
                top: 80,
                alignSelf: 'flex-start',
            }}
        >
            <Paper shadow='md' radius='md' p='md' withBorder style={{ width: 400 }}>
                {isDiscounted ? (
                    <>
                        <Text fw={700} fz={28}>₩{course.discountPrice.toLocaleString()}</Text>
                        <Text c='red' fz='sm'>
                            {course.discountRate}%{' '}
                            <Text span td='line-through' c='dimmed'>
                                ₩{course.originalPrice.toLocaleString()}
                            </Text>
                        </Text>
                    </>
                ) : (
                    <Text fw={700} fz={28}>₩{course.originalPrice.toLocaleString()}</Text>
                )}

                <Stack mt='md' spacing='xs'>
                    <Button fullWidth color='green'>수강신청 하기</Button>
                    <Button fullWidth variant='default'>장바구니에 담기</Button>
                </Stack>

                <Divider my='sm' />

                <Text size='sm'>지식공유자: {course.instructor}</Text>
                <Text size='sm'>커리큘럼: 수업 {totalVideosCount ?? '0'}개</Text>
                <Text size='sm'>강의 시간: {formatSecondsToKorean(totalDuration) ?? '정보 없음'}</Text>
                <Text size='sm'>난이도: {course.level}</Text>
            </Paper>
        </Box>
    );
}

export default CourseSidebar;