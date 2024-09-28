"use client";

import React, { useState } from "react";
import EditModal from "../editModal"; // Componente do modal de edição

interface RequestClientProps {
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    complement?: string;
  }
  onDelete: (clientId: string) => void; // Callback para exclusão
  clientId: string; // ID do cliente, necessário para a exclusão
  onSave: (clientId: string, updatedData: any) => void; // Função para salvar as alterações
}

const RequestClient: React.FC<RequestClientProps> = ({
  name,
  email,
  phone,
  cnpj,
  address,
  onDelete,
  clientId,
  onSave,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientData, setClientData] = useState({
    name,
    email,
    phone,
    cnpj,
    address,
  });
  

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSave = (updatedData: any) => {
    setClientData(updatedData);
    onSave(clientId, updatedData); // Salva os dados atualizados
  };

  const handleDelete = () => {
    if (confirm(`Tem certeza que deseja excluir ${clientData.name}?`)) {
      onDelete(clientId); // Chama a função de exclusão do pai
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
