"use client";

import React, { useState } from "react";
import EditModal from "./editModal";

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
  address?: Address;
  onDelete: (clientId: string) => void;
  id: string;
  onSave: (clientId: string, updatedData: any) => void;
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
  const [clientData, setClientData] = useState({
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
    },
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSave = (updatedData: any) => {
    setClientData(updatedData);
    onSave(id, updatedData);
  };

  const handleDelete = () => {
    if (confirm(`Tem certeza que deseja excluir ${clientData.name}?`)) {
      onDelete(id);
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
