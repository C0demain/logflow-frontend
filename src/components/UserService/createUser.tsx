import { useState } from "react";
import { registerUser } from "@/app/api/userService/createUser";
import axios from "axios";

interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
  sector: string;
  isActive: boolean;
}

export function CreateUser() {
  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    role: "MANAGER",
    sector: "ADMINISTRATIVO",
    isActive: true,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await registerUser(formData);
      console.log("Funcionário registrado:", response);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "MANAGER",
        sector: "ADMINISTRATIVO",
        isActive: true,
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage("Erro ao registrar funcionário: " + error.response?.data.message);
      } else {
        setErrorMessage("Erro desconhecido ao registrar funcionário");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="modal-top mb-5">
        <h1 className="text-2xl">Cadastrar Funcionário</h1>
      </div>
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
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          className="bg-gray-200 rounded-md border border-black w-full"
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Cargo"
          value={formData.role}
          onChange={handleChange}
          className="bg-gray-200 rounded-md border border-black w-full"
          required
        />
        <input
          type="text"
          name="sector"
          placeholder="Setor"
          value={formData.sector}
          onChange={handleChange}
          className="bg-gray-200 rounded-md border border-black w-full"
          required
        />
        <button type="submit" className="btn bg-blue-600 text-white">
          Registrar Funcionário
        </button>
      </form>
    </div>
  );
}
