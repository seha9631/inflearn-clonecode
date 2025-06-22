import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function useAddToCart(course) {
    const { user, updateUser } = useAuth();
    const [status, setStatus] = useState('idle');

    const addToCart = () => {
        if (!user) {
            setStatus('unauth');
            return 'unauth';
        }

        if (user.cart.includes(course.courseCode)) {
            setStatus('duplicate');
            return 'duplicate';
        }

        const updatedUser = {
            ...user,
            cart: [...user.cart, course.courseCode],
        };

        updateUser(updatedUser);
        setStatus('success');
        return 'success';
    };

    const resetStatus = () => setStatus('idle');

    return { addToCart, status, resetStatus };
}

export default useAddToCart;