import React from "react"
import { StageLine } from "./stageLine"
import { DeleteRequest } from "./deleteRequest";

interface RequestItemProps {
    name: string,
    status: string,
    id: string,
    stage1: boolean,
    stage2: boolean,
    stage3: boolean,
}

export const RequestItem: React.FC<RequestItemProps> = ({name, status, id, stage1, stage2, stage3}) => {
    let component;

    switch (status) {
        case 'PENDENTE':
        component = <div className="badge badge-warning">Pendente</div>;
        break;

        case 'FINALIZADO':
        component = <div className="badge badge-secondary">Em andamento</div>;
        break;

        case 'OPERACIONAL':
        component = <div className="badge badge-success">Finalizado</div>;
        break;
    }
    return (
        <div className="p-5 rounded-md space-y-5 w-full h-2/5 bg-slate-200 shadow-lg transition-all hover:bg-slate-300 hover:scale-105">
            <div className="flex flex-row justify-between">
                <h1 className="text-xl">{name}</h1>
                {component}
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
