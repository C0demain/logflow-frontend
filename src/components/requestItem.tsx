import React from "react"
import { StageLine } from "./stageLine"

interface RequestItemProps {
    name: string,
    stage1: boolean,
    stage2: boolean,
    stage3: boolean,
}

export const RequestItem: React.FC<RequestItemProps> = ({name, stage1, stage2, stage3}) => {
    return (
        <div className="p-5 rounded-md space-y-5 w-full h-2/5 bg-[#319de5] shadow-lg transition-all hover:bg-[#38afff] hover:scale-95">
            <h1 className="text-xl">{name}</h1>
            <div className="flex justify-center">
                <StageLine
                setor='Comercial'
                stage1={stage1}
                stage2={stage2}
                stage3={stage3}/>
                <StageLine
                setor='Operacional'
                stage1={stage1}
                stage2={stage2}
                stage3={!stage3}/>
                <StageLine
                setor='Financeiro'
                stage1={!stage1}
                stage2={!stage2}
                stage3={!stage3}/>
            </div>
        </div>
    )
}
