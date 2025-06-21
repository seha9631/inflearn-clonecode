import {
    Box,
    Button,
    Stack,
    Text,
    Paper,
    Divider
} from '@mantine/core';
import { formatSecondsToKorean, getTotalLectureDuration } from '../utils/time'
import CustomNotification from './CustomNotification';
import useAddToCart from '../hooks/useAddToCart';
import { IconCheck, IconAlertTriangle, IconLogin } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

function CourseSidebar({ course }) {
    const { addToCart, status, resetStatus } = useAddToCart(course);
    const navigate = useNavigate();

    const isDiscounted = course.discountPrice != null && course.discountRate != null;

    const totalVideosCount = course.sections.reduce(
        (total, section) => total + section.lectures.length,
        0
    );

    const totalDuration = getTotalLectureDuration(course.sections);

    const getNotificationProps = () => {
        switch (status) {
            case 'success':
                return {
                    color: 'green',
                    icon: <IconCheck size={20} />,
                    title: '장바구니에 담겼습니다.'
                };
            case 'duplicate':
                return {
                    color: 'yellow',
                    icon: <IconAlertTriangle size={20} />,
                    title: '이미 장바구니에 담긴 강의입니다.'
                };
            case 'unauth':
                return {
                    color: 'red',
                    icon: <IconLogin size={20} />,
                    title: '로그인이 필요합니다.'
                };
            default:
                return null;
        }
    };

    const notificationProps = getNotificationProps();

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