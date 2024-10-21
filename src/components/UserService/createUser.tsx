'use client'

import { useState, useEffect } from "react";
import { registerUser } from "@/app/api/userService/createUser";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import CreateButton from "../createButton";

interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
  sector: string;
  isActive: boolean;
}

const rolesBySector: Record<string, string[]> = {
  OPERACIONAL: ["SAC", "Motorista", "Analista de Logística", 'Ass. Administrativo "Operacional"', "Gerente Operacional" ],
  VENDAS: ["Vendedor"],
  FINANCEIRO: ['Analista Administrativo "Financeiro"', 'Ass. Administrativo "Financeiro"'],
  RH: ["Analista de RH", 'Ass. Administrativo "RH"'],
  DIRETORIA: ["Diretor Comercial", "Diretor Administrativo"],
};

export function CreateUser() {
  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    role: "",
    sector: "OPERACIONAL", // Setando um valor padrão para sector
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    // Atualiza o campo "role" quando o campo "sector" é alterado
    if (formData.sector) {
      setFormData((prev) => ({
        ...prev,
        role: rolesBySector[formData.sector][0] || "", // Define o primeiro role disponível para o setor
      }));
    }
  }, [formData.sector]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await registerUser(formData);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
        sector: "OPERACIONAL", // Resetando para o valor padrão
        isActive: true,
      });
      toast({
        status: "success",
        title: "Sucesso",
        description: "Funcionário adicionado com sucesso",
      });
      router.refresh()
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
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
      setLoading(false);
    }
  };

  return (
    <div>
      <CreateButton>
      <h1 className="text-2xl font-semibold mb-4">Cadastrar Funcionário</h1>
        <form onSubmit={handleSubmit} className="modal-middle space-y-3">
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
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <select
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="OPERACIONAL">OPERACIONAL</option>
            <option value="VENDAS">VENDAS</option>
            <option value="FINANCEIRO">FINANCEIRO</option>
            <option value="RH">RH</option>
            <option value="DIRETORIA">DIRETORIA</option>
          </select>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            {rolesBySector[formData.sector]?.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>

          <div className="modal-action flex justify-around">
            <button type="submit" className="btn btn-info">
              Registrar Funcionário
            </button>
          </div>
        </form>
        
      </CreateButton>
    </div>
  );
}
