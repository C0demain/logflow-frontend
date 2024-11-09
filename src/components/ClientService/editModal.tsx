"use client";

import ClientData from "@/interfaces/clientData";
import ClientUpdateInterface from "@/interfaces/clientUpdateInterface";
import React, { useState } from "react";
import MaskedInput from "react-text-mask";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientData: ClientData;
  onSave: (clientId: string, updatedData: ClientUpdateInterface) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, clientData, onSave }) => {
  const [formData, setFormData] = useState({
    name: clientData.name,
    phone: clientData.phone,
    cnpj: clientData.cnpj,
    email: clientData.email,
    address: {
      zipCode: clientData.address.zipCode,
      state: clientData.address.state,
      city: clientData.address.city,
      neighborhood: clientData.address.neighborhood,
      street: clientData.address.street,
      number: clientData.address.number,
      complement: clientData.address.complement
    }
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (clientData.id) {
      onSave(clientData.id, formData); // Chama a função para salvar os dados atualizados
    }
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

          {/* Usando MaskedInput para telefone */}
          <MaskedInput
            mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="Telefone"
            required
          />

          {/* Usando MaskedInput para CNPJ */}
          <MaskedInput
            mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="CNPJ"
            required
          />

          {/* Campos de endereço - desabilitados */}
          <input
            type="text"
            name="street"
            value={formData.address.street}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="Rua"
            disabled
          />
          <input
            type="text"
            name="number"
            value={formData.address.number}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="Número"
            disabled
          />
          <input
            type="text"
            name="neighborhood"
            value={formData.address.neighborhood}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="Bairro"
            disabled
          />
          <input
            type="text"
            name="city"
            value={formData.address.city}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="Cidade"
            disabled
          />
          <input
            type="text"
            name="state"
            value={formData.address.state}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="Estado"
            disabled
          />
          <input
            type="text"
            name="zipCode"
            value={formData.address.zipCode}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="CEP"
            disabled
          />
          <input
            type="text"
            name="complement"
            value={formData.address.complement}
            className="input w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            placeholder="Complemento"
            disabled
          />

          <div className="modal-action flex justify-end space-x-2 mt-4">
            <button type="submit" className="btn bg-blue-600 text-white hover:bg-blue-700">
              Salvar
            </button>
          </div>
        </form>
        <div className="modal-action">
          <label htmlFor={`edit${clientData}`} className="absolute top-2 right-2 cursor-pointer text-lg" onClick={onClose}>✕</label>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
