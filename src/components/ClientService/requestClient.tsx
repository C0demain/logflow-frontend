"use client";

import React, { useState } from "react";
import EditModal from "./editModal"; // Componente do modal de edição
import ClientUpdateInterface from "@/interfaces/clientUpdateInterface";
import ClientData from "@/interfaces/clientData";

interface Address {
  zipCode: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string;
}

interface RequestClientProps {
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  address?: Address; // Tornar o endereço opcional
  onDelete: (clientId: string) => void; // Callback para exclusão
  id: string; // ID do cliente, necessário para a exclusão
  onSave: (clientId: string, updatedData: ClientUpdateInterface) => void; // Função para salvar as alterações
}

const RequestClient: React.FC<RequestClientProps> = ({
  name,
  email,
  phone,
  cnpj,
  address,
  onDelete,
  id,
  onSave,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientData, setClientData] = useState<ClientData>({
    id,
    name,
    email,
    phone,
    cnpj,
    address: address || {
      zipCode: "",
      state: "",
      city: "",
      neighborhood: "",
      street: "",
      number: "",
      complement: "",
    }, // Garantir que address tenha um valor padrão
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSave = (clientId: string, updatedData: ClientUpdateInterface) => {
    onSave(id, updatedData); // Salva os dados atualizados
    setClientData(updatedData as ClientData);
  };

  const handleDelete = () => {
    if (confirm(`Tem certeza que deseja excluir ${clientData.name}?`)) {
      onDelete(id); // Chama a função de exclusão do pai
    }
  };

  return (
    <tr>
      <td>{clientData.name}</td>
      <td>{clientData.email}</td>
      <td>{clientData.phone}</td>
      <td>{clientData.cnpj}</td>
      <td>
        <button onClick={toggleModal} className="btn btn-primary btn-sm">
          Editar
        </button>
        <button onClick={handleDelete} className="btn btn-secondary btn-sm ml-2">
          Excluir
        </button>
      </td>

      {/* Modal de Edição */}
      {isModalOpen && (
        <EditModal
          isOpen={isModalOpen}
          onClose={toggleModal}
          clientData={clientData}
          onSave={handleSave}
        />
      )}
    </tr>
  );
};

export default RequestClient;
