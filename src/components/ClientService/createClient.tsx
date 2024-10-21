"use client";

import { registerClient } from "@/app/api/clientService/registerClient";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MaskedInput from "react-text-mask";
import CreateButton from "../createButton";

interface ClientData {
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  address: {
    zipCode: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    complement?: string;
  };
}

export function CreateClient() {
  const [formData, setFormData] = useState<ClientData>({
    name: "",
    email: "",
    phone: "",
    cnpj: "",
    address: {
      zipCode: "",
      state: "",
      city: "",
      neighborhood: "",
      street: "",
      number: "",
      complement: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Lida com campos aninhados dentro de 'address'
    if (name.includes("address.")) {
      const field = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        address: { ...prevData.address, [field]: value },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const buscarEnderecoPorCep = async () => {
    const cep = formData.address.zipCode.replace("-", "");

    if (cep.length !== 8) {
      toast({
        status: "error",
        title: "CEP inválido",
        description: "CEP deve ter 8 dígitos.",
      });
      return;
    }

    setLoadingCep(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        toast({
          status: "error",
          title: "CEP inválido",
          description: "Não foi possível encontrar esse CEP. Tente novamente",
        });
        setFormData((prevState) => ({
          ...prevState,
          address: {
            ...prevState.address,
            state: "",
            city: "",
            neighborhood: "",
            street: "",
          },
        }));
        return;
      }

      const { localidade, uf, bairro, logradouro } = data;
      setFormData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          state: uf,
          city: localidade,
          neighborhood: bairro,
          street: logradouro,
        },
      }));
    } catch (error) {
      toast({
        status: "error",
        title: "Erro ao buscar CEP",
        description:
          "Não foi possível encontrar o CEP especificado. Tente novamente",
      });
    } finally {
      setLoadingCep(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await registerClient(formData);
      toast({
        status: "success",
        title: "Sucesso",
        description: "Cliente criado com sucesso",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        cnpj: "",
        address: {
          zipCode: "",
          state: "",
          city: "",
          neighborhood: "",
          street: "",
          number: "",
          complement: "",
        },
      });

      setIsOpen(false);
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast({
          status: "error",
          title: "Erro",
          description: error.message,
        });
      } else {
        toast({
          status: "error",
          title: "Erro",
          description: "Ocorreu um erro inesperado. Tente novamente",
        });
      }
    } finally {
      router.refresh()
      setLoading(false);
    }
  };

  return (
    <div>
      <CreateButton>
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
            mask={["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
            name="phone"
            placeholder="Telefone"
            value={formData.phone}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <MaskedInput
            mask={[/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/,]}
            name="cnpj"
            placeholder="CNPJ"
            value={formData.cnpj}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <div className="flex space-x-4">
            <MaskedInput
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
              name="address.zipCode"
              placeholder="CEP"
              value={formData.address.zipCode}
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
          <div className="flex space-x-4">
            <input
              type="text"
              name="address.state"
              placeholder="Estado"
              value={formData.address.state}
              onChange={handleChange}
              className="input input-bordered w-full"
              readOnly
              disabled={loadingCep}
            />
            <input
              type="text"
              name="address.city"
              placeholder="Cidade"
              value={formData.address.city}
              onChange={handleChange}
              className="input input-bordered w-full"
              readOnly
              disabled={loadingCep}
            />
          </div>
          <input
            type="text"
            name="address.neighborhood"
            placeholder="Bairro"
            value={formData.address.neighborhood}
            onChange={handleChange}
            className="input input-bordered w-full"
            readOnly
            disabled={loadingCep}
          />
          <input
            type="text"
            name="address.street"
            placeholder="Rua"
            value={formData.address.street}
            onChange={handleChange}
            className="input input-bordered w-full"
            readOnly
            disabled={loadingCep}
          />
          <div className="flex space-x-4">
            <input
              type="text"
              name="address.number"
              placeholder="Número"
              value={formData.address.number}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="address.complement"
              placeholder="Complemento"
              value={formData.address.complement}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div className="modal-action flex flex-row justify-around">
            <button type="submit" className="btn btn-info" disabled={loading}>
              {loading ? "Registrando..." : "Registrar Cliente"}
            </button>
          </div>
        </form>
      </CreateButton>
    </div>
  );
}
