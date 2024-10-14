import { deleteOsById } from "@/app/api/orderService/deleteOrder";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";

interface DeleteOrderProps {
    id: string;
}

export const DeleteOrder: React.FC<DeleteOrderProps> = ({ id }) => {
    const toast = useToast()
    const router = useRouter()
    const handleDelete = async (id: string) => {
        try {
            const response = await deleteOsById(id);
            toast({
                status: "success",
                title: "Sucesso",
                description: "Ordem de serviço arquivada com sucesso"
            })
            router.refresh()
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Erro ao registrar ordem de serviço:', error.message);
            } else {
                console.error('Erro desconhecido ao registrar ordem de serviço');
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
        <div>
            <button className="btn" onClick={openModal}><FaTrash/></button>
            <dialog id={`modal${id}`} className="modal">
                <div className="modal-box w-3/12 max-w-5xl">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <p className="text-xl mb-6">Confirma exclusão?</p>
                    <div className="flex w-full justify-center space-x-7">
                        <label htmlFor="delete" onClick={()=>{closeModal()}} className="btn btn-sm bg-blue-600 text-white">Não</label>
                        <label htmlFor="delete" onClick={()=>{handleDelete(id)}} className="btn btn-sm bg-blue-600 text-white">Sim</label>
                    </div>
                </div>
            </dialog>
        </div>
    );
};