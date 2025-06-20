import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('loggedInUser');
            if (stored) {
                setUser(JSON.parse(stored));
            }
        } catch (e) {
            console.error('잘못된 로그인 데이터:', e);
            localStorage.removeItem('loggedInUser');
        }
    }, []);

    const login = (user) => {
        setUser(user);
        localStorage.setItem('loggedInUser', JSON.stringify(user));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('loggedInUser');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);