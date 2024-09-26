"use client";

import { registerClient } from "@/app/api/clientService/registerClient"; // Ensure your API path is correct
import { useState } from "react";
import axios from "axios";

interface UserData {
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  zipCode: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string; 
}

export default function CreateClient({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    cnpj: '',
    zipCode: '',
    state: '',
    city: '',
    neighborhood: '',
    street: '',
    number: '',
    complement: '',
  });
  
  const [errorMessage, setErrorMessage] = useState('');
  const [isAddressAutoFilled, setIsAddressAutoFilled] = useState(false); // Track if address is auto-filled

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleZipCodeBlur = async () => {
    if (formData.zipCode.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${formData.zipCode}/json/`);
        const { uf, localidade, logradouro, bairro } = response.data;
        setFormData(prev => ({
          ...prev,
          state: uf,
          city: localidade,
          street: logradouro,
          neighborhood: bairro,
        }));
        setIsAddressAutoFilled(true); // Set to true when address is filled
      } catch (error) {
        setErrorMessage('Erro ao buscar dados do CEP');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      await registerClient(formData);
      onClose(); // Close the modal after successful registration
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Erro desconhecido ao registrar cliente');
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Registrar Cliente</h2>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "name", placeholder: "Nome", type: "text", required: true },
          { name: "email", placeholder: "Email", type: "email", required: true },
          { name: "phone", placeholder: "Telefone", type: "text", required: true },
          { name: "cnpj", placeholder: "CNPJ", type: "text", required: true, disabled: false},
          { name: "zipCode", placeholder: "CEP", type: "text", required: true, onBlur: handleZipCodeBlur },
        ].map(({ name, placeholder, type, required, onBlur, disabled }) => (
          <input
            key={name}
            type={type}
            name={name}
            placeholder={placeholder}
            value={formData[name as keyof UserData]}
            onChange={handleChange}
            onBlur={onBlur}
            className="input input-bordered w-full"
            required={required}
            disabled={disabled || (name === "neighborhood" || name === "street") && isAddressAutoFilled} // Disable fields based on state
          />
        ))}

        {/* Estado and Cidade Fields */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              name="state"
              placeholder="Estado"
              value={formData.state}
              onChange={handleChange}
              disabled
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              name="city"
              placeholder="Cidade"
              value={formData.city}
              onChange={handleChange}
              disabled
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* Bairro and Rua Fields */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              name="neighborhood"
              placeholder="Bairro"
              value={formData.neighborhood}
              onChange={handleChange}
              disabled
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              name="street"
              placeholder="Rua"
              value={formData.street}
              onChange={handleChange}
              disabled
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* Número and Complemento Fields */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              name="number"
              placeholder="Número"
              value={formData.number}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              name="complement"
              placeholder="Complemento"
              value={formData.complement}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Registrar Cliente
        </button>
      </form>
    </div>
  );
}
