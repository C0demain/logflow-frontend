import { listUsers } from "@/app/api/userService/listUser";
import { useEffect, useState } from "react";
import Select from "react-select";

type propsType = {
    controlState: any[],
    dataKey: string,
    className?: string
}

export const SelectUser = (props: propsType) =>{
    const [clientOpt, setClientOpt] = useState<any[]>([])
    const [controlState, setControlState] = props.controlState

    const getUsers = async () => {
        const response = await listUsers()
        const options = []
        for(const c of response){
            options.push({
                value: c.id,
                label: c.name
            })
        }

        setClientOpt(options)

    };

    useEffect(()=>{
        getUsers()
    }, [])

    return (
        <Select
            options={clientOpt}
            value={controlState}
            onChange={(e) => { setControlState(e); } }
            className="text-black"
            classNamePrefix="custom-select"
            placeholder="Selecione um usuário"
            isClearable 
        />
    )
}
