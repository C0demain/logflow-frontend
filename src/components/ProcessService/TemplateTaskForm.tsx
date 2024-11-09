"use client"

import { CreateTemplateTaskDto } from "@/app/api/tasks/registerTemplateTask"
import { SelectRole } from "@/components/Selects/SelectRole"
import SelectSector from "@/components/Selects/SelectSector"
import SelectStage from "@/components/Selects/SelectStage"
import { Sector } from "@/enums/sector"
import { TaskStage } from "@/enums/taskStage"
import { FormEvent, useState } from "react"

interface ProcessFormProps {
    onSubmit: (data: Partial<CreateTemplateTaskDto>) => void
    initialData?: Partial<CreateTemplateTaskDto>,
    formTitle: string
}

export default function TemplateTaskForm(props: ProcessFormProps) {
    const { initialData, formTitle, onSubmit } = props
    const [title, setTitle] = useState<string>(initialData?.title || "")
    const [sector, setSector] = useState(initialData?.sector || Sector.OPERACIONAL)
    const [roleId, setRoleId] = useState(initialData?.roleId || '')
    const [stage, setStage] = useState(initialData?.stage || TaskStage.SALE_COMPLETED)

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        onSubmit({
            title,
            sector,
            roleId,
            stage,

        })
    }

    return (
        <form className="modal-middle space-y-3 flex flex-col items-start justify-stretch" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold mb-4">{formTitle}</h1>
            <input
                className="input input-bordered w-full"
                required type="text"
                onChange={e => { setTitle(e.target.value) }}
                value={title}
                name="title"
                placeholder="Título"
            />
            <SelectSector controlState={[sector, setSector]} />
            <SelectRole controlState={[roleId, setRoleId]} sector={sector} />
            <SelectStage controlState={[stage, setStage]} />

            <div className="modal-action flex flex-row justify-around">
                <button type="submit" className="btn btn-info hover:text-white">
                    Enviar
                </button>
            </div>
        </form>
    )
}