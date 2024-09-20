import React from "react"
import { StageLine } from "./stageLine"

interface RequestItemProps {
    name: string,
    status: string,
    stage1: boolean,
    stage2: boolean,
    stage3: boolean,
}

export const RequestItem: React.FC<RequestItemProps> = ({name, status, stage1, stage2, stage3}) => {
    let component;

    switch (status) {
        case 'PENDENTE':
        component = <div className="badge">Pendente</div>;
        break;

        case 'FINALIZADO':
        component = <div className="badge">Finalizado</div>;
        break;

        case 'OPERACIONAL':
        component = <div className="badge">Operacional</div>;
        break;

        case 'FINANCEIRO':
        component = <div className="badge">Financeiro</div>;
        break;

        case 'ADMINISTRATIVO':
        component = <div className="badge">Administrativo</div>;
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
        </div>
    )
}
