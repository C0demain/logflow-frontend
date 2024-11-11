'use client'
import { AuthContext } from "@/app/context/auth"
import { ReactNode, useContext } from "react"

interface accessProps{
    sectors: string[],
    children?: ReactNode
}

export default function AccessWrapper(props: accessProps){
    const {user} = useContext(AuthContext)
    const {sectors, children} = props

    if(user && user.sector && sectors.includes(user.sector)){
        return children
    }
}