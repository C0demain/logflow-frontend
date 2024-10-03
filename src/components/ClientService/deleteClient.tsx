import { FaTrash } from "react-icons/fa";

interface DeleteClientProps {
    id: string;
}

export const DeleteClient: React.FC<DeleteClientProps> = ({ id }) => {
    const handleDelete = async (id: string) => {
        try {
            const response = await deleteUserById(id);
            console.log('Cliente deletado:', response);

            window.location.reload();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Erro ao deletar cliente:', error.message);
            } else {
                console.error('Erro desconhecido ao deletar cliente');
            }
        }
    };

    return (
        <div>
            <label htmlFor={`delete${id}`} className="btn text-gray-700 bg-white hover:bg-gray-100">
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
                        <label htmlFor={`delete${id}`} onClick={() => handleDelete(id)} className="btn bg-blue-600 text-white">Sim, excluir!</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

function deleteUserById(id: string) {
    throw new Error("Function not implemented.");
}

