"use client";

import React, { useState } from 'react';

interface Client {
  id: number;
  nome: string;
  telefone: string;
  cnpj: string;
  email: string;
  cep: string;
  estado: string;
  cidade: string;
  rua: string;
  numero: string;
  complemento: string;
}

const validateCNPJ = (cnpj: string) => {
  const cleanedCNPJ = cnpj.replace(/[^\d]/g, '');
  if (cleanedCNPJ.length !== 14) return false;

  if (/^(\d)\1{13}$/.test(cleanedCNPJ)) return false;

  const calculateDigit = (base: string, factor: number) => {
    let sum = 0;
    for (let i = 0; i < base.length; i++) {
      sum += parseInt(base[i], 10) * factor;
      factor = factor === 2 ? 9 : factor - 1;
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const base = cleanedCNPJ.slice(0, 12);
  const firstDigit = calculateDigit(base, 5);
  const secondDigit = calculateDigit(base + firstDigit, 6);

  return firstDigit === parseInt(cleanedCNPJ[12], 10) &&
         secondDigit === parseInt(cleanedCNPJ[13], 10);
};

const CreateClient: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [formData, setFormData] = useState<Omit<Client, 'id'>>({
    nome: '',
    telefone: '',
    cnpj: '',
    email: '',
    cep: '',
    estado: '',
    cidade: '',
    rua: '',
    numero: '',
    complemento: '',
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cepValue = e.target.value;
    setFormData({ ...formData, cep: cepValue });

    if (cepValue.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setFormData(prevData => ({
            ...prevData,
            estado: data.uf,
            cidade: data.localidade,
            rua: data.logradouro,
          }));
        } else {
          setError('CEP não encontrado');
        }
      } catch {
        setError('Erro ao buscar CEP');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCNPJ(formData.cnpj)) {
      setError('CNPJ inválido');
      return;
    }
    if (editId !== null) {
      setClients(clients.map(client => (client.id === editId ? { id: editId, ...formData } : client)));
      setEditId(null);
    } else {
      setClients([...clients, { id: Date.now(), ...formData }]);
    }
    setFormData({ nome: '', telefone: '', cnpj: '', email: '', cep: '', estado: '', cidade: '', rua: '', numero: '', complemento: '' });
    onClose(); // Close the modal after submitting
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Cadastro de Cliente</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        {error && <p className="text-red-500">{error}</p>}
        <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} className="input input-bordered w-full mb-2" required />
        <input type="text" name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} className="input input-bordered w-full mb-2" required />
        <input type="text" name="cnpj" placeholder="CNPJ" value={formData.cnpj} onChange={handleChange} className="input input-bordered w-full mb-2" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input input-bordered w-full mb-2" required />
        <input type="text" name="cep" placeholder="CEP" value={formData.cep} onChange={handleCepChange} className="input input-bordered w-full mb-2" required />

        <div className="flex mb-2">
          <div className="flex-1 mr-2">
            <input type="text" name="estado" placeholder="Estado" value={formData.estado} readOnly className="input input-bordered w-full" />
          </div>
          <div className="flex-1">
            <input type="text" name="cidade" placeholder="Cidade" value={formData.cidade} readOnly className="input input-bordered w-full" />
          </div>
        </div>

        <div className="flex mb-2">
          <div className="flex-1 mr-2">
            <input type="text" name="numero" placeholder="Número" value={formData.numero} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
          <div className="flex-1">
            <input type="text" name="complemento" placeholder="Complemento" value={formData.complemento} onChange={handleChange} className="input input-bordered w-full" />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          {editId !== null ? 'Atualizar' : 'Adicionar'}
        </button>
      </form>
    </div>
  );
};

export default CreateClient;
