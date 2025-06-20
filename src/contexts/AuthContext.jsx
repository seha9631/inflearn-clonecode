// AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const data = localStorage.getItem('loggedInUser');
            if (data) {
                setUser(JSON.parse(data));
            }
        } catch (error) {
            console.error('Failed to parse user from localStorage', error);
            setUser(null);
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

    const updateUser = (newUser) => {
        setUser(newUser);
        localStorage.setItem('loggedInUser', JSON.stringify(newUser));
        localStorage.setItem(newUser.id, JSON.stringify(newUser)); // 원래 유저 정보도 덮어씀
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);