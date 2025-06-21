import { Button } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import useCartToggle from '../hooks/useCartToggle';
import CustomNotification from './CustomNotification';

function CartToggleButton({ courseCode, title, originalPrice, discountPrice, discountRate }) {
    const course = {
        courseCode,
        title,
        originalPrice,
        discountPrice,
        discountRate,
    };

    const { toggleCart, status, resetStatus } = useCartToggle(course);

    const getNotificationProps = () => {
        switch (status) {
            case 'added':
                return {
                    color: 'green',
                    title: '장바구니에 담겼습니다.',
                };
            case 'removed':
                return {
                    color: 'red',
                    title: '장바구니에서 제거되었습니다.',
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
                leftSection={<IconShoppingCart size={16} />}
                onClick={(e) => {
                    e.preventDefault();
                    toggleCart();
                }}
            >
                장바구니
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

export default CartToggleButton;