import { deleteTaskById } from "@/app/api/tasks/deleteTask";
import { useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";

interface DeleteTaskProps {
  id: string;
}

export const DeleteTask: React.FC<DeleteTaskProps> = ({ id }) => {
  const queryClient = useQueryClient();
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteTaskById(id);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      // Adicionar lógica adicional aqui, como limpar o formulário ou exibir uma mensagem de sucesso
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro ao registrar Tarefa:", error.message);
      } else {
        console.error("Erro desconhecido ao registrar Tarefa");
      }
      // Adicionar lógica para tratar erros, como exibir uma mensagem de erro
    }
  };

  const openModal = () => {
    const modal = document.getElementById(`modal${id}`) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div>
      <button className="btn btn-ghost btn-circle" onClick={openModal}>
        <FaTrash />
      </button>
      <dialog id={`modal${id}`} className="modal">
        <div className="modal-box">
          <p className="text-xl text-center mb-6">Deseja excluir essa tarefa?</p>
          <div className="flex w-full justify-center space-x-7">
            <button
              className="btn btn-info text-white"
              onClick={() => handleDelete(id)}
            >
              Sim
            </button>
            <form method="dialog">
              <button className="btn btn-error text-white">Não</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
