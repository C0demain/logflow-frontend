import React from "react";

interface stageLineProps{
    stage1: boolean,
    stage2: boolean,
    stage3: boolean,
}

export const StageLine: React.FC<stageLineProps> = ({ stage1, stage2, stage3}) => {
    return(
        <div>
            <ul className="steps">
                <li className={stage1?"step step-info w-20 md:w-32 sm:w-32 lg:w-60":"step w-20 md:w-32 sm:w-32 lg:w-60"}>Vendas</li>
                <li className={stage2?"step step-info w-20 md:w-32 sm:w-32 lg:w-60":"step w-20 md:w-32 sm:w-32 lg:w-60"}>Operacional</li>
                <li className={stage3?"step step-info w-20 md:w-32 sm:w-32 lg:w-60":"step w-20 md:w-32 sm:w-32 lg:w-60"}>Financeiro</li>
            </ul>
        </div>   
    )
}
