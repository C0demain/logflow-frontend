import { deleteOsById } from "@/app/api/orderService/deleteOs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

interface DeleteRequestProps {
    id: string;
}

export const DeleteRequest: React.FC<DeleteRequestProps> = ({ id }) => {
    const handleDelete = async (id: string) => {
        try {
            const response = await deleteOsById(id);
            console.log('Ordem de serviço deletada:', response);
            // Adicionar lógica adicional aqui, como limpar o formulário ou exibir uma mensagem de sucesso
            window.location.reload()
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Erro ao registrar ordem de serviço:', error.message);
            } else {
                console.error('Erro desconhecido ao registrar ordem de serviço');
            }
            // Adicionar lógica para tratar erros, como exibir uma mensagem de erro
        }
    };

    return (
        <div>
            <label htmlFor={`delete${id}`} className="btn text-white bg-red-700 hover:bg-red-900">
                <FaTrash />
            </label>

            <input type="checkbox" id={`delete${id}`} className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box bg-white">
                    <div className="modal-top mb-5">
                        <h1 className="text-2xl">Deseja realmente excluir essa ordem de serviço?</h1>
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