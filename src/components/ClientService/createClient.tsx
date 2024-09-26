"use client";

import { registerClient } from "@/app/api/clientService/registerClient"; // Certifique-se de que o caminho está correto
import axios from "axios";
import { useEffect, useState } from "react";

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

export function CreateClient() {
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
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCepBlur = async () => {
    if (formData.zipCode.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${formData.zipCode}/json/`);
        const { localidade, uf, bairro, logradouro } = response.data;

        setFormData({
          ...formData,
          state: uf,
          city: localidade,
          neighborhood: bairro,
          street: logradouro,
        });
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await registerClient(formData);
      console.log('Cliente registrado:', response);
      // Limpar os campos após o registro
      setFormData({
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Erro desconhecido ao registrar cliente');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label htmlFor="modal1" className="btn btn-info text-black hover:bg-blue-500">Novo Cliente</label>

      <input type="checkbox" id="modal1" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box bg-white">
          <div className="modal-top mb-5">
            <h1 className="text-2xl">Cadastrar Cliente</h1>
          </div>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <form onSubmit={handleSubmit} className="modal-middle space-y-4">
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
              onBlur={handleCepBlur}
              className="bg-gray-200 rounded-md border border-black w-full"
              required
            />
            <div className="flex space-x-4">
              <input
                type="text"
                name="state"
                placeholder="Estado"
                value={formData.state}
                onChange={handleChange}
                className="bg-gray-200 rounded-md border border-black w-full"
                readOnly
              />
              <input
                type="text"
                name="city"
                placeholder="Cidade"
                value={formData.city}
                onChange={handleChange}
                className="bg-gray-200 rounded-md border border-black w-full"
                readOnly
              />
            </div>
            <input
              type="text"
              name="neighborhood"
              placeholder="Bairro"
              value={formData.neighborhood}
              onChange={handleChange}
              className="bg-gray-200 rounded-md border border-black w-full"
              readOnly
            />
            <input
              type="text"
              name="street"
              placeholder="Rua"
              value={formData.street}
              onChange={handleChange}
              className="bg-gray-200 rounded-md border border-black w-full"
              readOnly
            />
            <div className="flex space-x-4">
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
            </div>
            <button type="submit" className="btn bg-blue-600 text-white">
              Registrar Cliente
            </button>
          </form>
          <div className="modal-action">
            <label htmlFor="modal1" className="btn bg-blue-600 text-white">Fechar</label>
          </div>
        </div>
      </div>
    </div>
  );
}
