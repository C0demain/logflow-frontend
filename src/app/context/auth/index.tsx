'use client'

import { createContext, useState } from "react";

export type UserProps = {
    token: string,
    id: string,
    role: string,
    sector: string
}

type AuthContextProps = {
    user: UserProps | undefined,
    login: (user: UserProps) => void,
    logout: () => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<UserProps | undefined>(undefined);

    const login = (user: UserProps) => {
        setUser(user)
        console.log(user)
    }

    const logout = () => {
        setUser(undefined)
    }

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            <>{children}</>
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider}