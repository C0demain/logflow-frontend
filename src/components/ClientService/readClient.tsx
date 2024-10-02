"use client";

import { useState, useCallback, useEffect } from "react";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Loading from "@/app/loading";
import { listClient } from "@/app/api/clientService/listClient";
import { deleteClientById } from "@/app/api/clientService/deleteClient";
import EditModal from "../editModal"; // Importa o modal de edição
import ClientData from "@/interfaces/clientData";
import { updateClientById } from "@/app/api/clientService/updateClient";
import ClientUpdateInterface from "@/interfaces/clientUpdateInterface";

export function ReadClient() {
  const [data, setData] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState<ClientData | null>(null); // Estado para armazenar o cliente atual

  const getClient = useCallback(async () => {
    try {
      const response = await listClient("", "", "", "");
      if (Array.isArray(response.clients)) {
        setData(response.clients);
      } else {
        setError("Dados dos clientes não estão no formato esperado.");
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
      setError("Não foi possível carregar os dados dos clientes.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = async (clientId: string) => {
    try {
      await deleteClientById(clientId);
      setData((prevData) => prevData.filter(client => client.id !== clientId));
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      setError("Não foi possível excluir o cliente.");
    }
  };

  const handleEdit = (clientId: string) => {
    const clientToEdit = data.find(client => client.id === clientId);
    if (clientToEdit) {
      setCurrentClient(clientToEdit);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentClient(null);
  };

  const handleSave = async (clientId: string, updatedData: ClientUpdateInterface) => {
      try {
        await updateClientById(clientId, updatedData);
        window.location.reload(); // Atualizar a página após a edição
    } catch (error: unknown) {
    } finally {
        setLoading(false);
    }
    handleCloseModal(); // Fecha o modal após salvar
  };

  useEffect(() => {
    getClient();
  }, [getClient]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return <div>Nenhum cliente encontrado.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="text-lg px-4 py-2">Nome</th>
            <th className="text-lg px-4 py-2">Email</th>
            <th className="text-lg px-4 py-2">Telefone</th>
            <th className="text-lg px-4 py-2">CNPJ</th>
            <th className="text-lg px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-lg">
          {data.map((client) => (
            <tr key={client.id} className="hover:bg-gray-100">
              <td className="px-4 py-3">{client.name}</td>
              <td className="px-4 py-3">{client.email}</td>
              <td className="px-4 py-3">{client.phone}</td>
              <td className="px-4 py-3"> {client.cnpj}</td>
              <td className="flex justify-center space-x-4 px-4 py-3">
                <button onClick={() => handleEdit(client.id)}>
                  <AiFillEdit className="text-blue-500 hover:text-blue-700 text-2xl" />
                </button>
                <button onClick={() => handleDelete(client.id)}>
                  <AiFillDelete className="text-red-500 hover:text-red-700 text-2xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>


      </table>

      {/* Modal de Edição */}
      {isModalOpen && currentClient && (
        <EditModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          clientData={currentClient}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
