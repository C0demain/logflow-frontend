import { deleteUserById } from "@/app/api/userService/deleteUser"; 
import { FaTrash } from "react-icons/fa";

interface DeleteUserProps {
    id: string;
    onDelete: (id: string) => void; 
}

export const DeleteUser: React.FC<DeleteUserProps> = ({ id, onDelete }) => {
    const handleDelete = async (id: string) => {
        try {
            const response = await deleteUserById(id); 
            console.log('Funcionário deletado:', response);
            onDelete(id); 
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Erro ao deletar funcionário:', error.message);
            } else {
                console.error('Erro desconhecido ao deletar funcionário');
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
