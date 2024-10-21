import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { deleteClientById } from "@/app/api/clientService/deleteClient";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface DeleteClientProps {
  id: string;
}

export const DeleteClient: React.FC<DeleteClientProps> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar a abertura do modal
  const toast = useToast()
  const router = useRouter()

  const handleDelete = async (clientId: string) => {
    try {
      await deleteClientById(clientId);
      toast({
        status: "success",
        title: "Sucesso",
        description: "Cliente excluído com sucesso"
      });

    } catch (error) {
      toast({
        status: "error",
        title: "Erro",
        description: "Não foi possível excluir o cliente. Tente novamente"
      });
    }
    router.refresh()
  };

  return (
    <div>
      <label htmlFor={`delete${id}`} className="btn btn-md bg-gray-100 text-black flex items-center hover:bg-gray-300">
        <FaTrash />
      </label>

      <input type="checkbox" id={`delete${id}`} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box bg-white">
          <div className="modal-top mb-5">
            <h1 className="text-2xl">Deseja realmente excluir esse cliente?</h1>
          </div>
          <div className="modal-action">
            <label htmlFor={`delete${id}`} className="btn bg-blue-600 text-white">Não, não excluir</label>
            <label htmlFor={`delete${id}`} onClick={() => { handleDelete(id) }} className="btn bg-blue-600 text-white">Sim, excluir!</label>
          </div>
        </div>
      </div>
    </div>
  );
};
