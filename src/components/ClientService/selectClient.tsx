import { listClient } from "@/app/api/clientService/listClient";
import { createApiInstances } from "@/app/util/baseURL";
import { useState, useEffect } from "react";
import Select from "react-select";

type propsType = {
    controlState: any[],
    dataKey: string,
    className?: string
}

export const SelectClient = (props: propsType) =>{
    const [clientOpt, setClientOpt] = useState<any[]>([])
    const [controlState, setControlState] = props.controlState
    const { dataKey, className } = props

    const getClients = async () => {
        const response = await listClient('','','','')
        const options = []
        for(let c of response.clients){
            options.push({
                value: c.id,
                label: c.name
            })
        }

        setClientOpt(options)

    };

    useEffect(()=>{
        getClients()
    }, [])

    return (
        <Select
            options={clientOpt}
            value={controlState}
            onChange={(e) => { setControlState(e); } }
            className="text-black"
            classNamePrefix="custom-select"
            placeholder="Selecione um cliente"
            isClearable 
        />
    )
}
