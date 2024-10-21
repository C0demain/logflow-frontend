import { ListClients } from "@/app/api/clientService/listClients";
import { useEffect, useState } from "react";
import Select from "react-select";

type propsType = {
    controlState: any[],
    dataKey: string,
    className?: string
}

export const SelectClient = (props: propsType) => {
    const [clientOpt, setClientOpt] = useState<any[]>([])
    const [controlState, setControlState] = props.controlState

    const getClients = async () => {
        const response = await ListClients('', '', '', '')
        const options = []
        for (const c of response.clients) {
            options.push({
                value: c.id,
                label: c.name
            })
        }

        setClientOpt(options)

    };

    useEffect(() => {
        getClients()
    }, [])

    return (
        <Select
            options={clientOpt}
            value={controlState}
            onChange={(e) => { setControlState(e); }}
            className="text-black"
            classNamePrefix="custom-select"
            placeholder="Selecione um cliente"
            isClearable
        />
    )
}
