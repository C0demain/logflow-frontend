import { DeleteServiceOrderById } from "@/app/api/serviceOrder/deleteOrder";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";

interface DeleteOrderProps {
  id: string;
}

export const DeleteServiceOrder: React.FC<DeleteOrderProps> = ({ id }) => {
  const toast = useToast();
  const router = useRouter();
  const handleDelete = async (id: string) => {
    try {
      const response = await DeleteServiceOrderById(id);
      toast({
        status: "success",
        title: "Sucesso",
        description: "Ordem de serviço arquivada com sucesso",
      });
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro ao registrar ordem de serviço:", error.message);
      } else {
        console.error("Erro desconhecido ao registrar ordem de serviço");
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

  const closeModal = () => {
    const modal = document.getElementById(`modal${id}`) as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  return (
    <div className="relative">
      <button
        className="btn btn-ghost absolute btn-circle transition-all hover:bg-red-500 hover:text-white"
        onClick={openModal}
      >
        <FaTrash />
      </button>
      <dialog id={`modal${id}`} className="modal">
        <div className="modal-box w-11/12 max-w-md">
          <p className="text-xl mb-6">Deseja confirmar a exclusão?</p>
          <div className="flex w-full justify-center space-x-4">
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
