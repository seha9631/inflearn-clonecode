import { useAuth } from '../contexts/AuthContext';

function useEnrollmentCheck(courseCode) {
    const { user } = useAuth();
    return user?.enrolled?.includes(courseCode) ?? false;
}

export default useEnrollmentCheck;