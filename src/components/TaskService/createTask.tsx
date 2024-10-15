"use client";
import { registerTask } from "@/app/api/tasks/registerTask";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Select, { SingleValue } from "react-select";

interface CreateTaskProps {
  userId: string;
  orderId: string;
}

type SectorOption = {
  value: "OPERACIONAL" | "FINANCEIRO" | "RH" | "DIRETORIA" | "VENDAS";
  label: string;
};

const sectorOptions: SectorOption[] = [
  { value: "OPERACIONAL", label: "OPERACIONAL" },
  { value: "FINANCEIRO", label: "FINANCEIRO" },
  { value: "RH", label: "RH" },
  { value: "DIRETORIA", label: "DIRETORIA" },
  { value: "VENDAS", label: "VENDAS" },
];

export default function CreateTask({ userId, orderId }: CreateTaskProps) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [sector, setSector] = useState<SectorOption | null>(sectorOptions[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (sector) {
        const response = await registerTask({
          title,
          userId,
          orderId,
          sector: sector.value,
        });
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      } else {
        console.error("Setor não selecionado");
      }
    } catch (error) {
      console.error("Erro ao registrar tarefa:", error);
    }
  };

  const handleModalOpen = () => {
    const modal = document.getElementById("modal");
    if (modal) {
      (modal as HTMLDialogElement).showModal();
    } else {
      console.error("Modal element not found");
    }
  };

  return (
    <div>
      <button className="btn btn-info" onClick={handleModalOpen}>
        Nova Tarefa
      </button>

      <dialog className="modal" id="modal">
        <div className="modal-box">
          <h1 className="text-2xl">Nova Tarefa</h1>
          <form onSubmit={handleSubmit} className="modal-middle space-y-2">
            <div>
              <label htmlFor="title" className="mr-4">
                Título
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label htmlFor="sector" className="mr-2">
                Setor
              </label>
              <Select
                options={sectorOptions}
                value={sector}
                onChange={(selectedOption: SingleValue<SectorOption>) => {
                  setSector(selectedOption);
                }}
                className="text-black"
                classNamePrefix="custom-select"
                placeholder="Selecione um setor"
                isClearable
              />
            </div>
            <div className="modal-action flex flex-row justify-between">
              <button type="submit" className="btn btn-info">
                Registrar nova tarefa
              </button>
              <form method="dialog">
                <button
                  className="btn btn-error text-white"
                >
                  Fechar
                </button>
              </form>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
