import { Button } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import CustomNotification from './CustomNotification';
import useWishlistToggle from '../hooks/useWishlistToggle';
import { WISHLIST_NOTIFICATION_MESSAGES } from '../utils/constants';

function WishlistToggleButton({ courseCode, title, originalPrice, discountPrice, discountRate }) {
    const course = {
        courseCode,
        title,
        originalPrice,
        discountPrice,
        discountRate,
    };

    const { toggleWishlist, status, resetStatus } = useWishlistToggle(course);

    const notificationProps = WISHLIST_NOTIFICATION_MESSAGES[status] ?? null;

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