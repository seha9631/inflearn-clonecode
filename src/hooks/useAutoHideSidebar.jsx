import { useEffect, useRef, useState } from 'react';

function useAutoHideSidebar(shouldEnable, timeout = 2000) {
    const [show, setShow] = useState(false);
    const hideTimeoutRef = useRef(null);

    const handleMouseMove = () => {
        if (!shouldEnable) return;
        setShow(true);
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = setTimeout(() => setShow(false), timeout);
    };

    useEffect(() => {
        return () => {
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        };
    }, []);

    return { show, handleMouseMove };
}

export default useAutoHideSidebar;