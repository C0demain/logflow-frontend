'use client'

import { createContext, useState, useEffect } from "react";
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

const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<UserProps | undefined>(undefined);

    useEffect(() => {
        const storedUser = Cookies.get('user');
        console.log("peguei dos cookies", storedUser); // Adicionado log

        if (storedUser) {
            try {
                const userParse: UserProps = JSON.parse(storedUser);
                console.log("usei o parse",userParse)
                login( { token: userParse.token, id: userParse.id, role: userParse.role, sector: userParse.sector } )
            } catch (error) {
                console.error("Error parsing user data from cookie:", error);
            }
        }
    }, []);

    const login = (userT: UserProps) => {
        console.log("recebido", userT)
        setUser(userT);
        console.log("Teste setado", user)
        Cookies.set('user', JSON.stringify(user), { expires: 7 }); // Cookie expira em 7 dias
    }

    const logout = () => {
        setUser(undefined);
        Cookies.remove('user');
        console.log("User removed from cookie"); // Adicionado log
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider }
