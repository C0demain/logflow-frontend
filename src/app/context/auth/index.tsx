'use client';

import { createContext, useState, ReactNode } from "react";
import Cookies from 'js-cookie';

export type UserProps = {
    token: string;
    id: string;
    sector: string;
    role: string;
};

type AuthContextProps = {
    user: UserProps | undefined;
    login: (user: UserProps) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserProps | undefined>(() => {
        const cookieUser = Cookies.get('user');
        if (cookieUser) {
            try {
                return JSON.parse(cookieUser);
            } catch (error) {
                console.error("Error parsing user data from cookie:", error);
            }
        }
        return undefined;
    });

    const login = (userT: UserProps) => {
        setUser(userT);
        Cookies.set('user', JSON.stringify(userT), { expires: 7 }); // Cookie expira em 7 dias
    };

    const logout = () => {
        setUser(undefined);
        Cookies.remove('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
