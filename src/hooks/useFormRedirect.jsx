import { useNavigate } from 'react-router-dom';

function useFormRedirect(path = '/') {
    const navigate = useNavigate();

    const scheduleRedirect = (delay = 2000) => {
        setTimeout(() => navigate(path), delay);
    };

    return { scheduleRedirect };
}

export default useFormRedirect;