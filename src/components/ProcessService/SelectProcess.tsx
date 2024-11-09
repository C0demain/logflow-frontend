import { listClient } from "@/app/api/clientService/listClient";
import { getProcesses } from "@/app/api/process/getProcesses";
import { useEffect, useState } from "react";
import Select from "react-select";

type propsType = {
    controlState: any[],
    dataKey: string,
    className?: string
}

export const SelectProcess = (props: propsType) => {
    const [processOpt, setProcessOpt] = useState<any[]>([])
    const [controlState, setControlState] = props.controlState

    const fetchProcesses = async () => {
        const response = await getProcesses()
        const options = []
        for (const p of response) {
            options.push({
                value: p.id,
                label: p.title
            })
        }

        setProcessOpt(options)

    };

    useEffect(() => {
        fetchProcesses()
    }, [])

    return (
        <Select
            options={processOpt}
            value={controlState}
            onChange={(e) => { setControlState(e); }}
            className="text-black"
            classNamePrefix="custom-select"
            placeholder="Selecione um processo"
            isClearable
        />
    )
}
