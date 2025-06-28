import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

const IsLoggedInContext = createContext();

export function IsLoggedInProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        const restoreSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsLoggedIn(!!session);
        };

        restoreSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsLoggedIn(!!session);
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    return (
        <IsLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </IsLoggedInContext.Provider>
    );
}

export function useIsLoggedIn() {
    return useContext(IsLoggedInContext);
}