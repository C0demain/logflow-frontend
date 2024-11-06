"use client"

import { Process } from "@/interfaces/process"
import TemplateTask from "@/interfaces/templateTask"
import { FormEvent, useState } from "react"

interface ProcessFormProps{
    onSubmit: (data: Partial<Process>) => void
    initialData?: {
        title: string
    },
    formTitle: string
}

export default function ProcessForm(props: ProcessFormProps){
    const { initialData, formTitle, onSubmit } = props
    const [title, setTitle] = useState<string>(initialData?.title || "")

    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault()

        onSubmit({title})
    }

    return (
        <form className="modal-middle space-y-3 flex flex-col items-start" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold mb-4">{formTitle}</h1>
            <input 
            className="input input-bordered w-full" 
            required type="text" 
            onChange={e => {setTitle(e.target.value)}}
            value={title} 
            name="title"
            placeholder="Título"
            />
            <div className="modal-action flex flex-row justify-around">
            <button type="submit" className="btn btn-info hover:text-white">
              Enviar
            </button>
          </div>
        </form>
    )
}