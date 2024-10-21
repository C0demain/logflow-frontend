'use client'

import { AuthContext } from "@/context/auth";
import Loading from "@/components/Shared/loading";
import { CreateServiceOrder } from "@/components/ServiceOrder/createServiceOrder";
import { ReadOrder } from "@/components/ServiceOrder/readOrder";
import { useState, useContext, useEffect } from "react";

export default function ServiceOrder() {
  const setoresAcessoPermitidos = ["FINANCEIRO", "VENDAS", "DIRETORIA", "OPERACIONAL"];
  const setoresCrudPermitido = ["VENDAS", "DIRETORIA"]
  const [crudAutorizado, setCrudAutorizado] = useState<boolean>(false)
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
      setoresCrudPermitido.includes(user.sector) ? setCrudAutorizado(true) : setCrudAutorizado(false)
    }
  }, [setoresCrudPermitido, user]);

  if (!user || !user.sector) {
    return <div><Loading /></div>;
  }

  return (
    setoresAcessoPermitidos.includes(user.sector) ? (
      <div className="m-5 space-y-5">
        <div className="justify-between flex items-center">
          <h1 className="text-2xl">Lista de Ordens de Serviço:</h1>
          {crudAutorizado ? <CreateServiceOrder id={userId || ''} /> : <></>}
        </div>

        <div className="overflow-x-auto">
          <ReadOrder autorizado={crudAutorizado} userId={userId || ''} />
        </div>
      </div>
    ) : (
      <div className="flex justify-center items-center h-full">Você não tem permissão para acessar esta página.</div>
    )

  );
}
