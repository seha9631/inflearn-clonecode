import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function useAddToCart(course) {
    const { user, updateUser } = useAuth();
    const [status, setStatus] = useState('idle');

    const addToCart = () => {
        if (!user) {
            setStatus('unauth');
            return;
        }

        if (user.cart.includes(course.courseCode)) {
            setStatus('duplicate');
            return;
        }

        const updatedUser = {
            ...user,
            cart: [...user.cart, course.courseCode],
        };

        updateUser(updatedUser);
        setStatus('success');
    };

    const resetStatus = () => setStatus('idle');

    return { addToCart, status, resetStatus };
}