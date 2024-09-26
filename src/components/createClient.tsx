"use client";

import { registerClient } from "@/app/api/clientService/registerClient"; // Ensure your API path is correct
import { useState } from "react";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await registerClient(formData);
      console.log(response)
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
    <div>
      <h2 className="text-xl mb-4">Registrar Cliente</h2>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
          className="bg-gray-200 rounded-md border border-black w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="bg-gray-200 rounded-md border border-black w-full"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Telefone"
          value={formData.phone}
          onChange={handleChange}
          className="bg-gray-200 rounded-md border border-black w-full"
          required
        />
        <input
          type="text"
          name="cnpj"
          placeholder="CNPJ"
          value={formData.cnpj}
          onChange={handleChange}
          className="bg-gray-200 rounded-md border border-black w-full"
          required
        />
        <input
          type="text"
          name="zipCode"
          placeholder="CEP"
          value={formData.zipCode}
          onChange={handleChange}
          className="bg-gray-200 rounded-md border border-black w-full"
          required
        />
        <input
          type="text"
          name="state"
          placeholder="Estado"
          value={formData.state}
          onChange={handleChange}
          className="bg-gray-200 rounded-md border border-black w-full"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="Cidade"
          value={formData.city}
          onChange={handleChange}
          className="bg-gray-200 rounded-md border border-black w-full"
          required
        />
        <input
          type="text"
          name="neighborhood"
          placeholder="Bairro"
          value={formData.neighborhood}
          onChange={handleChange}
          className="bg-gray-200 rounded-md border border-black w-full"
          required
        />
        <input
          type="text"
          name="street"
          placeholder="Rua"
          value={formData.street}
          onChange={handleChange}
          className="bg-gray-200 rounded-md border border-black w-full"
          required
        />
        <input
          type="text"
          name="number"
          placeholder="Número"
          value={formData.number}
          onChange={handleChange}
          className="bg-gray-200 rounded-md border border-black w-full"
          required
        />
        <input
          type="text"
          name="complement"
          placeholder="Complemento"
          value={formData.complement}
          onChange={handleChange}
          className="bg-gray-200 rounded-md border border-black w-full"
        />
        <button type="submit" className="btn bg-blue-600 text-white">
          Registrar Cliente
        </button>
      </form>
    </div>
  );
}
