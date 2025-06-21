
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
        <Notification
            icon={icon}
            color={color}
            title={title}
            withCloseButton={false}
            mt='md'
        />
    );
}

export default CustomNotification;