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
                <li className={stage1?"step step-info w-20 md:w-60 sm:w-32":"step w-20 md:w-60 sm:w-32"}>Comercial</li>
                <li className={stage2?"step step-info w-20 md:w-60 sm:w-32":"step w-20 md:w-60 sm:w-32"}>Operacional</li>
                <li className={stage3?"step step-info w-20 md:w-60 sm:w-32":"step w-20 md:w-60 sm:w-32"}>Financeiro</li>
            </ul>
        </div>   
    )
}
