"use client"

import { listUsers } from "@/app/api/userService/listUser";
import { AuthContext } from "@/app/context/auth";
import { CreateUser, UserData } from "@/components/UserService/createUser";
import { ReadUsers } from "@/components/UserService/listUser";
import { useCallback, useContext, useEffect, useState } from "react";

export default function UserPage() {
  const setoresPermitidos = ["RH", "DIRETORIA"];
  const [isModalOpen, setModalOpen] = useState(false);
  const [autorizado, setAutorizado] = useState(false);
  const [data, setData] = useState<UserData[]>([]); // Estado centralizado
  const { user } = useContext(AuthContext);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await listUsers({});
      setData(response);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (user) {
      setoresPermitidos.includes(user.sector) ? setAutorizado(true) : setAutorizado(false);
    }
  }, [user]);

  const handleCreateUser = (newUser: UserData) => {
    setData((prevData) => [...prevData, newUser]);
  };
  
  const handleDeleteUser = (id: string) => {
    setData((prevData) => prevData.filter((user) => user.id !== id));
  };

  return (
    <div className="m-5 space-y-5">
      <h1 className="text-2xl">Lista de Funcionários:</h1>
      <ReadUsers autorizado={autorizado} onDelete={handleDeleteUser} />
      {autorizado && <CreateUser onCreate={handleCreateUser} />}
    </div>
  );
}
