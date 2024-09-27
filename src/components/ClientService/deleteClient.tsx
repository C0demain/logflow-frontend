 // Certifique-se de que a API de exclusão de usuários esteja corretaimport { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

interface DeleteClientProps {
    id: string;
}

export const DeleteClient: React.FC<DeleteClientProps> = ({ id }) => {
    const handleDelete = async (id: string) => {
        try {
            const response = await deleteUserById(id); // Chamada para excluir o cliente
            console.log('Cliente deletado:', response);
            // Adicionar lógica adicional aqui, como atualizar a lista de clientes ou exibir uma mensagem de sucesso
            window.location.reload(); // Opcional: pode ser melhor atualizar a lista de clientes sem recarregar a página
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Erro ao deletar cliente:', error.message);
            } else {
                console.error('Erro desconhecido ao deletar cliente');
            }
            // Adicionar lógica para tratar erros, como exibir uma mensagem de erro
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

