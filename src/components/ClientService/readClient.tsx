import { useState, useCallback, useEffect } from "react";
import Loading from "@/app/loading";
import { listClient } from "@/app/api/clientService/listClient";
import { deleteClientById } from "@/app/api/clientService/deleteClient";
import EditModal from "./editModal";
import ClientData from "@/interfaces/clientData";
import { updateClientById } from "@/app/api/clientService/updateClient";
import ClientUpdateInterface from "@/interfaces/clientUpdateInterface";

import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { FaEdit } from "react-icons/fa";
import { DeleteClient } from "./deleteClient";
import Empty from "@/components/Shared/Empty";
import useToasts from "@/hooks/useToasts";

interface ReadClientProps {
  autorizado: boolean
}

export const ReadClient: React.FC<ReadClientProps> = ({ autorizado }) => {
  const [data, setData] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState<ClientData | null>(null);
  const {showToast, showToastOnReload} = useToasts()

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
      showToastOnReload( "Cliente excluído com sucesso", 'success');
      window.location.reload()
    } catch (error) {
      showToast("Não foi possível excluir o cliente. Tente novamente", 'error');
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
    // Prepare the updated data to match UpdateClientDto structure
    const clientUpdate: ClientUpdateInterface = {
      name: updatedData.name,
      phone: updatedData.phone,
      cnpj: updatedData.cnpj,
      email: updatedData.email,
      address: {
        zipCode: updatedData.address.zipCode,
        state: updatedData.address.state,
        city: updatedData.address.city,
        neighborhood: updatedData.address.neighborhood,
        street: updatedData.address.street,
        number: updatedData.address.number,
        complement: updatedData.address.complement,
      },
    };

    try {
      await updateClientById(clientId, clientUpdate);
      showToastOnReload( "Cliente atualizado com sucesso", 'success');
      window.location.reload()
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        showToast(error.message, 'error')
      } else {
        showToast("Ocorreu um erro inesperado. Tente novamente", 'error');
      }
    }
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
    return <Empty title="Ainda não há clientes cadastrados" description="Crie um novo cliente com o botao '+'" />
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full bg-white shadow-md rounded-lg">
        <thead className="bg-blue-400 text-white rounded-t-lg">
          <tr>
            <th className="text-lg px-4 py-2 rounded-tl-lg">Nome</th>
            <th className="text-lg px-4 py-2">Email</th>
            <th className="text-lg px-4 py-2">Telefone</th>
            <th className="text-lg px-4 py-2">CNPJ</th>
            <th className="text-lg px-4 py-2 rounded-tr-lg">Ações</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-lg">
          {data.map((client) => (
            <tr key={client.id} className="hover:bg-gray-100">
              <td className="px-4 py-3">{client.name}</td>
              <td className="px-4 py-3">{client.email}</td>
              <td className="px-4 py-3">{client.phone}</td>
              <td className="px-4 py-3"> {client.cnpj}</td>
              {autorizado && (
                <td className="flex justify-center space-x-4 px-4 py-3">
                  <button onClick={() => handleEdit(client.id)}>
                    <label className="btn btn-md bg-gray-100 text-black flex items-center hover:bg-gray-300">
                      <FaEdit />
                    </label>
                  </button>
                  <DeleteClient id={client.id} />
                </td>
              )}

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
