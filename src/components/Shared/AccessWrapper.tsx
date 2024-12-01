'use client'
import { AuthContext } from "@/app/context/auth"
import { ReactNode, useContext, useEffect, useState } from "react"

interface accessProps{
    sectors: string[],
    children?: ReactNode
}

export default function AccessWrapper(props: accessProps){
    const {user} = useContext(AuthContext)
    const {sectors, children} = props

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    if(user && user.sector && sectors.includes(user.sector)){
        return <>{children}</>
    }
}