"use client";
import { registerTask } from "@/app/api/tasks/registerTask";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Select, { SingleValue } from "react-select";
import CreateButton from "../createButton";

interface CreateTaskProps {
  orderId: string;
  userId: string; 
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

export default function CreateTask({ orderId, userId }: CreateTaskProps) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [sector, setSector] = useState<SectorOption | null>(sectorOptions[0]);
  const [completed, setCompleted] = useState(false); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); // Reseta a mensagem de erro ao iniciar o envio
    
    try {
      // Validação dos IDs
      if (!userId) {
        setErrorMessage("Usuário não encontrado.");
        return;
      }

      if (!orderId) {
        setErrorMessage("Ordem de serviço não encontrada.");
        return;
      }

      if (sector) {
        const response = await registerTask({
          title,
          orderId,
          sector: sector.value,
          userId, 
          completed,
        });

        // Verifica se a resposta é válida, caso contrário, mostra erro
        if (!response) {
          throw new Error("Erro ao registrar a tarefa. Verifique os dados e tente novamente.");
        }

        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      } else {
        setErrorMessage("Setor não selecionado.");
      }
    } catch (error: any) {
      console.error("Erro ao registrar tarefa:", error);
      setErrorMessage(error.message || "Erro inesperado ao registrar a tarefa.");
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
      <CreateButton>
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
              required
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
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                className="form-checkbox"
              />
              <span className="ml-2">Concluído</span>
            </label>
          </div>
          {errorMessage && (
            <div className="text-red-500">{errorMessage}</div> // Exibe mensagem de erro
          )}
          <div className="modal-action flex flex-row justify-around pt-2">
            <button type="submit" className="btn btn-info">
              Registrar nova tarefa
            </button>
          </div>
        </form>
      </CreateButton>
    </div>
  );
}
