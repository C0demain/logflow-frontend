'use client'

import { createContext, useState, useEffect, ReactNode } from "react";
import Cookies from 'js-cookie';

export type UserProps = {
    token: string,
    id: string,
    sector: string,
    role: string
}

type AuthContextProps = {
    user: UserProps | undefined,
    login: (user: UserProps) => void,
    logout: () => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<UserProps | undefined>(undefined);

    useEffect(() => {
        const storedUser = Cookies.get('user');
        if (storedUser) {
            try {
                const userParse: UserProps = JSON.parse(storedUser);
                setUser(userParse);
            } catch (error) {
                console.error("Error parsing user data from cookie:", error);
            }
        }
    }, []);

    const login = (userT: UserProps) => {
        setUser(userT);
        Cookies.set('user', JSON.stringify(userT), { expires: 7 }); // Cookie expira em 7 dias
    }

    const logout = () => {
        console.log("Logging out user");
        setUser(undefined);
        Cookies.remove('user');
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider }
