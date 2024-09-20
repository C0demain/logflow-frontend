"use client"

import { CreateRequest } from "@/components/createRequest"
import { RequestItem } from "@/components/requestItem"
import { useCallback, useEffect, useState } from "react"
import { listOs } from "../api/orderService/listOs"

interface OrderData {
    title: string;
    clientRelated: string;
    status: string;
    userId: string;
    id: string;
  }

export default function RequestList(){
    const [data, setData] = useState<any[]>([])

    const getOs = useCallback(async ()=>{
            const response = listOs()
            console.log('Listado', response)
            setData(await response)
    },[])

    useEffect(()=>{
       getOs()
    }, [getOs])
    return (
        <div className="m-5 space-y-5">
            <div className="justify-between flex items-center">
                <h1 className="text-2xl">Lista de ordens de serviço:</h1>
                <CreateRequest/>
            </div>
            <div className=" flex flex-col space-y-10 justify-center">
                {data.map( (order: OrderData) => (
                    <RequestItem
                    status={order.status}
                    id={order.id}
                    name={order.title}
                    stage1={true}
                    stage2={true}
                    stage3={true}/>
                )
                )}
                
            </div>
        </div>
    )
}