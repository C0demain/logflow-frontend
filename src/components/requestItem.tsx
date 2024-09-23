import React, { useEffect, useState } from "react"
import { StageLine } from "./stageLine"
import { DeleteRequest } from "./deleteRequest";

interface RequestItemProps {
    name: string,
    status: string,
    id: string,
    sector: string,
}

export const RequestItem: React.FC<RequestItemProps> = ({name, status, id, sector}) => {
    let component;
    const [stage1, setStage1] = useState(false)
    const [stage2, setStage2] = useState(false)
    const [stage3, setStage3] = useState(false)

    const setSector = async(sector: string) => {
        switch (sector) {
            case 'FINANCEIRO':
            setStage3(true)
    
            case 'ADMINISTRATIVO':
            setStage2(true)

            case 'COMERCIAL':
            setStage1(true)
        }
    }

    useEffect(()=>{
        setSector(sector);
    })
    return (
        <div className="p-5 rounded-md space-y-5 w-full h-2/5 bg-white shadow-lg transition-all hover:bg-gray-50 hover:scale-105">
            <div className="flex flex-row justify-between">
                <h1 className="text-xl">{name}</h1>
                <div className={status=="FINALIZADO"?"badge badge-success": status=="PENDENTE"? "badge badge-info": "badge badge-info"}>{status}</div>
            </div>
            <div className="flex justify-center">
                <StageLine
                stage1={stage1}
                stage2={stage2}
                stage3={stage3}/>
            </div>
            <div className="flex justify-end">
                <DeleteRequest
                id={id}/>
            </div>
        </div>
    )
}
