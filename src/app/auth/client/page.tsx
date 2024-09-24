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

const ClientApp: React.FC = () => {
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
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

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
  };

  const handleEdit = (client: Client) => {
    setFormData(client);
    setEditId(client.id);
    setSelectedClientId(null);
  };

  const openDeleteConfirmation = (id: number) => {
    setConfirmDelete(id);
  };

  const handleDelete = () => {
    if (confirmDelete !== null) {
      setClients(clients.filter(client => client.id !== confirmDelete));
      setConfirmDelete(null);
    }
  };

  const openModal = (clientId: number) => {
    setSelectedClientId(clientId);
  };

  const closeModal = () => {
    setSelectedClientId(null);
    setConfirmDelete(null);
  };

  const selectedClient = clients.find(client => client.id === selectedClientId) || null;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mb-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Cadastro de Cliente</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            className="input input-bordered w-full mb-2"
            required
          />
          <input
            type="text"
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleChange}
            className="input input-bordered w-full mb-2"
            required
          />
          <input
            type="text"
            name="cnpj"
            placeholder="CNPJ"
            value={formData.cnpj}
            onChange={handleChange}
            className="input input-bordered w-full mb-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full mb-2"
            required
          />
          <input
            type="text"
            name="cep"
            placeholder="CEP"
            value={formData.cep}
            onChange={handleCepChange}
            className="input input-bordered w-full mb-2"
            required
          />
          <input
            type="text"
            name="estado"
            placeholder="Estado"
            value={formData.estado}
            readOnly
            className="input input-bordered w-full mb-2"
          />
          <input
            type="text"
            name="cidade"
            placeholder="Cidade"
            value={formData.cidade}
            readOnly
            className="input input-bordered w-full mb-2"
          />
          <input
            type="text"
            name="rua"
            placeholder="Rua"
            value={formData.rua}
            readOnly
            className="input input-bordered w-full mb-2"
          />
          <input
            type="text"
            name="numero"
            placeholder="Número"
            value={formData.numero}
            onChange={handleChange}
            className="input input-bordered w-full mb-2"
            required
          />
          <input
            type="text"
            name="complemento"
            placeholder="Complemento"
            value={formData.complemento}
            onChange={handleChange}
            className="input input-bordered w-full mb-2"
          />
          <button type="submit" className="btn btn-primary w-full">
            {editId !== null ? 'Atualizar' : 'Adicionar'}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {clients.map(client => (
          <div key={client.id} className="p-4 border border-gray-200 rounded-lg shadow bg-white">
            <h2 className="font-semibold">{client.nome}</h2>
            <p>Telefone: {client.telefone}</p>
            <p>Email: {client.email}</p>
            <button
              onClick={() => openModal(client.id)}
              className="btn btn-info mt-2"
            >
              Saiba Mais
            </button>
          </div>
        ))}
      </div>

      {/* Modal for detailed view */}
      {selectedClientId && selectedClient && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <button onClick={closeModal} className="absolute right-2 top-2 text-xl">
              &times;
            </button>
            <h2 className="font-semibold">{selectedClient.nome}</h2>
            <p>CNPJ: {selectedClient.cnpj}</p>
            <p>Telefone: {selectedClient.telefone}</p>
            <p>Email: {selectedClient.email}</p>
            <p>CEP: {selectedClient.cep}</p>
            <p>Estado: {selectedClient.estado}</p>
            <p>Cidade: {selectedClient.cidade}</p>
            <p>Rua: {selectedClient.rua}</p>
            <p>Número: {selectedClient.numero}</p>
            <p>Complemento: {selectedClient.complemento}</p>
            <div className="modal-action">
              <button onClick={() => handleEdit(selectedClient)} className="btn btn-yellow">
                Editar
              </button>
              <button onClick={() => openDeleteConfirmation(selectedClient.id)} className="btn btn-danger">
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="font-semibold">Confirmar Exclusão</h2>
            <p>Você tem certeza que deseja excluir este cliente?</p>
            <div className="modal-action">
              <button onClick={handleDelete} className="btn btn-danger">
                Confirmar
              </button>
              <button onClick={closeModal} className="btn">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientApp;
