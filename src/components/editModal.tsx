"use client";

import React, { useState } from "react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientData: {
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
  };
  onSave: (updatedData: any) => void; // Função para salvar as alterações
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, clientData, onSave }) => {
  const [formData, setFormData] = useState(clientData);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({...formData, address: {...formData.address, [name]: value}});
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData); // Chama a função para salvar os dados atualizados
    onClose(); // Fecha o modal após salvar
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
            value={formData.address.street}
            onChange={handleAddressChange}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="Rua"
            required
          />
          <input
            type="text"
            name="number"
            value={formData.address.number}
            onChange={handleAddressChange}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="Número"
            required
          />
          <input
            type="text"
            name="neighborhood"
            value={formData.address.neighborhood}
            onChange={handleAddressChange}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="Bairro"
            required
          />
          <input
            type="text"
            name="city"
            value={formData.address.city}
            onChange={handleAddressChange}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="Cidade"
            required
          />
          <input
            type="text"
            name="state"
            value={formData.address.state}
            onChange={handleAddressChange}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="Estado"
            required
          />
          <input
            type="text"
            name="zipCode"
            value={formData.address.zipCode}
            onChange={handleAddressChange}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="CEP"
            required
          />
          <input
            type="text"
            name="complement"
            value={formData.address.complement}
            onChange={handleAddressChange}
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
