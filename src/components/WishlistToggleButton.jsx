import { Button } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import CustomNotification from './CustomNotification';
import useWishlistToggle from '../hooks/useWishlistToggle';

function WishlistToggleButton({ courseCode, title, originalPrice, discountPrice, discountRate }) {
    const course = {
        courseCode,
        title,
        originalPrice,
        discountPrice,
        discountRate,
    };

    const { toggleWishlist, status, resetStatus } = useWishlistToggle(course);

    const getNotificationProps = () => {
        switch (status) {
            case 'added':
                return {
                    color: 'green',
                    title: '찜한 강의로 추가되었습니다.',
                };
            case 'removed':
                return {
                    color: 'red',
                    title: '찜 목록에서 제거되었습니다.',
                };
            case 'unauth':
                return {
                    color: 'red',
                    title: '로그인이 필요합니다.',
                };
            default:
                return null;
        }
    };

    const notificationProps = getNotificationProps();

    return (
        <>
            <Button
                color='#00c471'
                radius='md'
                size='xs'
                leftSection={<IconHeart size={16} />}
                onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist();
                }}
            >
                찜하기
            </Button>

            {status !== 'idle' && notificationProps && (
                <CustomNotification
                    {...notificationProps}
                    visible
                    duration={2000}
                    onClose={resetStatus}
                />
            )}
        </>
    );
}

export default WishlistToggleButton;