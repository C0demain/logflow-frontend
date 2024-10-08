"use client";

import { registerClient } from "@/app/api/clientService/registerClient";
import { validarCNPJ, validarEmail, validarTelefone } from "@/app/util/validations";
import axios from "axios";
import { useState } from "react";
import MaskedInput from 'react-text-mask';

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
    name: "",
    email: "",
    phone: "",
    cnpj: "",
    zipCode: "",
    state: "",
    city: "",
    neighborhood: "",
    street: "",
    number: "",
    complement: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false); 
  const [cepError, setCepError] = useState(""); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let cleanValue = value;
    if (name === "phone") {
      cleanValue = cleanValue.replace(/\D/g, ""); 
    } else if (name === "cnpj") {
      cleanValue = cleanValue.replace(/\D/g, ""); 
    } else if (name === "zipCode") {
      cleanValue = cleanValue.replace("-", ""); 
    }

    setFormData({ ...formData, [name]: cleanValue });
  };

  const buscarEnderecoPorCep = async () => {
    const cleanCep = formData.zipCode.replace("-", "");

    if (cleanCep.length !== 8) {
      setCepError("CEP deve ter 8 dígitos.");
      return;
    }

    setLoadingCep(true);
    setCepError(""); 

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);
      if (response.data.erro) {
        setCepError("CEP não encontrado.");
        setLoadingCep(false);
        setFormData(prevState => ({
          ...prevState,
          state: '',
          city: '',
          neighborhood: '',
          street: '',
        }));
        return;
      }

      const { localidade, uf, bairro, logradouro } = response.data;
      setFormData({
        ...formData,
        state: uf,
        city: localidade,
        neighborhood: bairro,
        street: logradouro,
      });
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      setCepError("Erro ao buscar CEP. Verifique sua conexão ou tente novamente.");
    } finally {
      setLoadingCep(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    if (!validarCNPJ(formData.cnpj)) {
      setErrorMessage("CNPJ inválido. Formato correto: 00.000.000/0000-00");
      setLoading(false);
      return;
    }

    if (!validarEmail(formData.email)) {
      setErrorMessage("Email inválido.");
      setLoading(false);
      return;
    }

    if (!validarTelefone(formData.phone)) {
      setErrorMessage("Telefone inválido. Formato correto: (XX) XXXXX-XXXX");
      setLoading(false);
      return;
    }

    try {
      const response = await registerClient(formData);
      console.log("Cliente registrado:", response);

      setFormData({
        name: "",
        email: "",
        phone: "",
        cnpj: "",
        zipCode: "",
        state: "",
        city: "",
        neighborhood: "",
        street: "",
        number: "",
        complement: "",
      });

      window.location.reload();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Erro desconhecido ao registrar cliente");
      }
    } finally {
      setLoading(false);  
    }
  };

  return (
    <div>
      <label htmlFor="modal1" className="btn btn-info text-black hover:bg-blue-500">
        Novo Cliente
      </label>

      <input type="checkbox" id="modal1" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <h1 className="text-2xl font-semibold mb-4">Cadastrar Cliente</h1>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <form onSubmit={handleSubmit} className="modal-middle space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <MaskedInput
              mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} 
              name="phone"
              placeholder="Telefone"
              value={formData.phone}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <MaskedInput
              mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.',/\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]} 
              name="cnpj"
              placeholder="CNPJ"
              value={formData.cnpj}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <div className="flex space-x-4">
              <MaskedInput
                mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                name="zipCode"
                placeholder="CEP"
                value={formData.zipCode}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
              <button
                type="button"
                className="btn btn-outline btn-primary"
                onClick={buscarEnderecoPorCep}
                disabled={loadingCep}
              >
                {loadingCep ? "Buscando..." : "Auto Preencher"}
              </button>
            </div>
            {cepError && <div className="text-red-500">{cepError}</div>}
            <div className="flex space-x-4">
              <input
                type="text"
                name="state"
                placeholder="Estado"
                value={formData.state}
                onChange={handleChange}
                className="input input-bordered w-full"
                readOnly
                disabled={loadingCep}
              />
              <input
                type="text"
                name="city"
                placeholder="Cidade"
                value={formData.city}
                onChange={handleChange}
                className="input input-bordered w-full"
                readOnly
                disabled={loadingCep}
              />
            </div>
            <input
              type="text"
              name="neighborhood"
              placeholder="Bairro"
              value={formData.neighborhood}
              onChange={handleChange}
              className="input input-bordered w-full"
              readOnly
              disabled={loadingCep}
            />
            <input
              type="text"
              name="street"
              placeholder="Rua"
              value={formData.street}
              onChange={handleChange}
              className="input input-bordered w-full"
              readOnly
              disabled={loadingCep}
            />
            <div className="flex space-x-4">
              <input
                type="text"
                name="number"
                placeholder="Número"
                value={formData.number}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="complement"
                placeholder="Complemento"
                value={formData.complement}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
                {loading ? 'Registrando...' : 'Registrar Cliente'}
              </button>
            </div>
          </form>
          <label htmlFor="modal1" className="absolute top-2 right-2 cursor-pointer text-lg">✕</label>
        </div>
      </div>
    </div>
  );
}