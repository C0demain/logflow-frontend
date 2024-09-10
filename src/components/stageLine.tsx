import React from "react";

interface stageLineProps{
    setor: string,
    stage1: boolean,
    stage2: boolean,
    stage3: boolean,
}

export const StageLine: React.FC<stageLineProps> = ({setor, stage1, stage2, stage3}) => {
    return(
        <div>
            <h1 className="text-xl">{setor}</h1>
            <ul className="steps">
                <li className={stage1?"step step-primary":"step"}>Register</li>
                <li className={stage2?"step step-primary":"step"}>Choose plan</li>
                <li className={stage3?"step step-primary":"step"}>Purchase</li>
            </ul>
        </div>
    )
}
