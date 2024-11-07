import { listClient } from "@/app/api/clientService/listClient";
import { listRoles } from "@/app/api/userService/listRoles";
import { Sector } from "@/enums/sector";
import { useEffect, useState } from "react";
import Select from "react-select";

type propsType = {
    controlState: any[],
    className?: string,
    sector: `${Sector}`
}

export const SelectRole = (props: propsType) =>{
    const {sector} = props
    const [options, setOptions] = useState<any[]>([])
    const [controlState, setControlState] = props.controlState

    const getRoles = async () => {
        const response = await listRoles()
        const options = []
        let first;
        for(const c of response){
            if(c.sector === sector){
                if(!first){
                    first = c.id
                }

                options.push({
                    value: c.id,
                    label: c.name
                })
            }
        }

        setControlState(first)
        setOptions(options)
        
    };
    
    useEffect(()=>{
        getRoles()
        console.log(controlState)
    }, [sector])

    return (
        <select
            value={controlState}
            onChange={(e) => { setControlState(e.target.value); } }
            className="select select-bordered w-full"
            name="stage"
            key="stage"
        >
            {options.map(op => <option key={op.value} value={op.value}>{op.label}</option>)}
        </select>
    )
}
