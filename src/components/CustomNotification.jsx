
import { useEffect } from 'react';
import { Notification } from '@mantine/core';

function CustomNotification({
    color,
    icon,
    title,
    visible,
    duration = 2000,
    onClose
}) {
    useEffect(() => {
        if (visible && onClose) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [visible, duration, onClose]);

    if (!visible) return null;

    return (
        <div
            style={{
                position: 'fixed',
                bottom: 40,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 9999,
            }}
        >
            <Notification
                icon={icon}
                color={color}
                title={title}
                withCloseButton={false}
                mt='md'
            />
        </div>
    );
}

export default CustomNotification;