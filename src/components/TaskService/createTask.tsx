'use client'
import { registerTask } from "@/app/api/tasks/registerTask"
import { useState } from "react"
import Select, { SingleValue } from "react-select"

interface CreateTaskProps {
  userId: string,
  orderId: string
}

type SectorOption = {
  value: 'ADMINISTRATIVO' | 'FINANCEIRO' | 'COMERCIAL',
  label: string
}

const sectorOptions: SectorOption[] = [
  { value: 'ADMINISTRATIVO', label: 'ADMINISTRATIVO' },
  { value: 'FINANCEIRO', label: 'FINANCEIRO' },
  { value: 'COMERCIAL', label: 'COMERCIAL' }
]

export default function CreateTask({ userId, orderId }: CreateTaskProps) {
  const [title, setTitle] = useState('')
  const [sector, setSector] = useState<SectorOption | null>(sectorOptions[0])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (sector) {
        const response = await registerTask({ title, userId, orderId, sector: sector.value })
        console.log('Response:', response); // Adicione este log para inspecionar a resposta
      } else {
        console.error('Setor não selecionado')
      }
    } catch (error) {
      console.error('Erro ao registrar tarefa:', error)
    }
  }

  return (
    <div>
      <label htmlFor="modal1" className="btn btn-info text-black hover:bg-blue-500">Nova tarefa</label>

      <input type="checkbox" id="modal1" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box bg-white">
          <div className="modal-top mb-5">
            <h1 className="text-2xl">Nova Ordem de Serviço</h1>
          </div>
          <form onSubmit={handleSubmit} className="modal-middle space-y-2">
            <div>
              <label htmlFor="title" className="mr-4">Título</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-400 rounded-md border border-black"
              />
            </div>
            <div>
              <label htmlFor="sector" className="mr-2">Setor</label>
              <Select
                options={sectorOptions}
                value={sector}
                onChange={(selectedOption: SingleValue<SectorOption>) => { setSector(selectedOption); }}
                className="text-black"
                classNamePrefix="custom-select"
                placeholder="Selecione um setor"
                isClearable
              />
            </div>
            <button
              type="submit"
              className="btn bg-blue-600 text-white"
            >
              Registrar nova tarefa
            </button>
          </form>
          <div className="modal-action">
            <label htmlFor="modal1" onClick={()=>(window.location.reload())} className="btn bg-blue-600 text-white">Fechar</label>
          </div>
        </div>
      </div>
    </div>
  )
}
