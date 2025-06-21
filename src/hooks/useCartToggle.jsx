import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function useCartToggle(course) {
    const { user, updateUser } = useAuth();
    const [status, setStatus] = useState('idle');

    const toggleCart = () => {
        if (!user) {
            setStatus('unauth');
            return;
        }

        const inCart = user.cart?.includes(course.courseCode);
        const newCart = inCart
            ? user.cart.filter((c) => c !== course.courseCode)
            : [...user.cart, course.courseCode];

        updateUser({ ...user, cart: newCart });
        setStatus(inCart ? 'removed' : 'added');
    };

    const resetStatus = () => setStatus('idle');

    return { toggleCart, status, resetStatus };
}