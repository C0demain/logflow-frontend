"use client";

import ClientData from "@/interfaces/clientData";
import ClientUpdateInterface from "@/interfaces/clientUpdateInterface";
import React, { useState } from "react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientData: ClientData
  onSave: (clientId: string, updatedData: ClientUpdateInterface) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, clientData, onSave }) => {
  const [formData, setFormData] = useState({
    name: clientData.name,
    phone: clientData.phone,
    cnpj: clientData.cnpj,
    email: clientData.email,
    zipCode: clientData.address.zipCode,
    state: clientData.address.state,
    city: clientData.address.city,
    neighborhood: clientData.address.neighborhood,
    street: clientData.address.street,
    number: clientData.address.number,
    complement: clientData.address.complement
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (clientData.id) {
      onSave(clientData.id, formData);
    }
    onClose();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Editar Cliente</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="Nome"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="Telefone"
            required
          />
          <input
            type="text"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="CNPJ"
            required
          />
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="Rua"
            required
          />
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="Número"
            required
          />
          <input
            type="text"
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="Bairro"
            required
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="Cidade"
            required
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="Estado"
            required
          />
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="CEP"
            required
          />
          <input
            type="text"
            name="complement"
            value={formData.complement}
            onChange={handleChange}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="Complemento"
          />

          <div className="modal-action flex justify-end space-x-2 mt-4">
            <button type="button" className="btn bg-gray-300 hover:bg-gray-400" onClick={onClose}>
              Fechar
            </button>
            <button type="submit" className="btn bg-blue-600 text-white hover:bg-blue-700">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
