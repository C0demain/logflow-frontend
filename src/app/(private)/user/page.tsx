"use client";

import { AuthContext } from "@/context/auth";
import Loading from "@/components/Shared/loading";
import { CreateUser } from "@/components/UserService/createUser";
import { ListUsers } from "@/components/UserService/listUser";
import { useContext, useEffect, useState } from "react";

export default function UserPage() {
  const setoresPermitidos = ["RH", "DIRETORIA"]
  const [isModalOpen, setModalOpen] = useState(false);
  const [autorizado, setAutorizado] = useState(false)
  const { user } = useContext(AuthContext)

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (user) {
      setoresPermitidos.includes(user.sector) ? setAutorizado(true) : setAutorizado(false)
    }
  }, [setoresPermitidos, user])

  if (!user || !user.sector) {
    return <div><Loading /></div>;
  }

  return (
    <div className="m-5 space-y-5">
      <div className="justify-between flex items-center">
        <h1 className="text-2xl">Lista de Funcionários:</h1>
      </div>

      <div className="flex flex-col space-y-5 sm:flex-row sm:space-y-0 sm:space-x-5">
        <div className="flex-1">
          <ListUsers autorizado={autorizado} />
        </div>
      </div>

      {autorizado && <CreateUser />}
    </div>

  );
}
