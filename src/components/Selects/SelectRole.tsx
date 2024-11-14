import { listRoles } from "@/app/api/userService/listRoles";
import { Sector } from "@/enums/sector";
import { useEffect, useState } from "react";

type propsType = {
    controlState: any[],
    className?: string,
    sector: `${Sector}` | string | undefined
}

export const SelectRole = (props: propsType) => {
    const { sector } = props
    const [options, setOptions] = useState<any[]>([])
    const [controlState, setControlState] = props.controlState

    const getRoles = async () => {
        const response = await listRoles()
        const options = [{value: undefined, label: ''}]
        let first;
        for (const c of response) {
            if (c.sector === sector) {
                if (!first) {
                    first = c.id
                }

                options.push({
                    value: c.id,
                    label: c.name
                })
            }
        }

        setControlState('')
        setOptions(options)

    };

    useEffect(() => {
        getRoles()
    }, [sector])

    return (
        <select
            value={controlState}
            onChange={(e) => { setControlState(e.target.value); }}
            className="select select-bordered w-full"
            name="stage"
            key="stage"
        >
            {options.map(op => <option key={op.value} value={op.value}>{op.label}</option>)}
        </select>
    )
}
