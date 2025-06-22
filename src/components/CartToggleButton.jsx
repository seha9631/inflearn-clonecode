import { Button } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import useCartToggle from '../hooks/useCartToggle';
import CustomNotification from './CustomNotification';
import { CART_NOTIFICATION_MESSAGES } from '../utils/constants';

function CartToggleButton({ courseCode, title, originalPrice, discountPrice, discountRate }) {
    const course = {
        courseCode,
        title,
        originalPrice,
        discountPrice,
        discountRate,
    };

    const { toggleCart, status, resetStatus } = useCartToggle(course);

    const notificationProps = CART_NOTIFICATION_MESSAGES[status] ?? null;

    return (
        <>
            <Button
                color='#00c471'
                radius='md'
                size='xs'
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