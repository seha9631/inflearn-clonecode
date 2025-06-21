import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function useWishlistToggle(course) {
    const { user, updateUser } = useAuth();
    const [status, setStatus] = useState('idle');

    const toggleWishlist = () => {
        if (!user) {
            setStatus('unauth');
            return;
        }

        const wishlist = user.wishlist ?? [];
        const isWishlisted = wishlist.includes(course.courseCode);

        const newWishlist = isWishlisted
            ? wishlist.filter(code => code !== course.courseCode)
            : [...wishlist, course.courseCode];

        updateUser({ ...user, wishlist: newWishlist });
        setStatus(isWishlisted ? 'removed' : 'added');
    };

    const resetStatus = () => {
        setStatus('idle');
    };

    return { toggleWishlist, status, resetStatus };
}

export default useWishlistToggle;