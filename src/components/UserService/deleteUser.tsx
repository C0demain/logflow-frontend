import { deleteUserById } from "@/app/api/userService/deleteUser"; // Certifique-se de que está importando do serviço correto
import { useToast } from "@chakra-ui/react";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaTrash } from "react-icons/fa";

interface DeleteUserProps {
    id: string;
    onDelete: (id: string) => void; // Adicionando prop onDelete
}

export const DeleteUser: React.FC<DeleteUserProps> = ({ id, onDelete }) => {
    const toast = useToast()
    const router = useRouter()
    const handleDelete = async (id: string) => {
        try {
            const response = await deleteUserById(id); 
            toast({
                status: "success",
                title: "Sucesso",
                description: "Funcionário arquivado com sucesso"
            })
            onDelete(id);
            router.refresh()

        } catch (error: unknown) {
            if (isAxiosError(error)) {
                toast({
                    status: "error",
                    title: "Erro",
                    description: error.message
                })
            } else {
                toast({
                    status: "error",
                    title: "Erro",
                    description: "Ocorreu um erro inesperado. Tente novamente"
                  })
            }
        }
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
                        <h1 className="text-2xl">Deseja realmente excluir esse funcionário?</h1>
                    </div>
                    <div className="modal-action">
                        <label htmlFor={`delete${id}`} className="btn bg-blue-600 text-white">Não, não excluir</label>
                        <label htmlFor={`delete${id}`} onClick={() => handleDelete(id)} className="btn bg-blue-600 text-white">Sim, excluir!</label>
                    </div>
                </div>
            </div>
        </div>
    );
};
