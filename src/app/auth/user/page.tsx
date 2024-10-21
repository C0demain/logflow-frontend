"use client";
import { useContext, useEffect, useState } from "react";
import { CreateUser } from "@/components/UserService/createUser";
import { ReadUsers } from "@/components/UserService/listUser";
import { AuthContext } from "@/app/context/auth";
import Loading from "@/app/loading";

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
  }, [user])

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
          <ReadUsers autorizado={autorizado} />
        </div>
      </div>

      {autorizado && <CreateUser />}
    </div>

  );
}
