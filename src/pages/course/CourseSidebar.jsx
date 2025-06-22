import {
    Box,
    Button,
    Stack,
    Text,
    Paper,
    Divider
} from '@mantine/core';
import { IconCheck, IconAlertTriangle, IconLogin } from '@tabler/icons-react';
import { formatSecondsToKorean, getTotalLectureDuration } from '../../utils/time'
import CustomNotification from '../../components/CustomNotification';
import useAddToCart from '../../hooks/useAddToCart';
import { useNavigate } from 'react-router-dom';
import { COURSE_SIDEBAR_NOTIFICATION } from '../../utils/constants';

function CourseSidebar({ course }) {
    const { addToCart, status, resetStatus } = useAddToCart(course);
    const navigate = useNavigate();

    const isDiscounted = course.discountPrice != null && course.discountRate != null;

    const totalVideosCount = course.sections.reduce(
        (total, section) => total + section.lectures.length,
        0
    );

    const totalDuration = getTotalLectureDuration(course.sections);

    const notificationData = COURSE_SIDEBAR_NOTIFICATION[status] ?? null;

    const iconMap = {
        success: <IconCheck size={20} />,
        duplicate: <IconAlertTriangle size={20} />,
        unauth: <IconLogin size={20} />,
    };

    const notificationProps = notificationData
        ? {
            ...notificationData,
            icon: iconMap[notificationData.iconType],
        }
        : null;

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
                    <Button
                        fullWidth
                        color='#00c471'
                        onClick={() => {
                            const result = addToCart();
                            if (result === 'success') {
                                navigate('/carts', {
                                    state: { selectedCourse: course.courseCode }
                                });
                            }
                        }}
                    >
                        수강신청 하기
                    </Button>

                    <Button fullWidth variant='default' onClick={addToCart}>
                        장바구니에 담기
                    </Button>
                </Stack>

                {status !== 'idle' && notificationProps && (
                    <CustomNotification
                        {...notificationProps}
                        visible
                        duration={2000}
                        onClose={resetStatus}
                    />
                )}

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