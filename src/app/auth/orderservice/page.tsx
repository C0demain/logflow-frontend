'use client'

import { ReadOrder } from "@/components/OrderService/readOrder";
import { CreateOrder } from "@/components/OrderService/createOrder";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/context/auth";
import Loading from "@/app/loading";

export default function OrderService() {
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
  }, [user]);

  if (!user || !user.sector) {
    return <div><Loading/></div>;
  }

  return (
    setoresAcessoPermitidos.includes(user.sector) ? (
      <div className="m-5 space-y-5">
        <div className="justify-between flex items-center">
          <h1 className="text-2xl">Lista de ordens de serviço:</h1>
          {crudAutorizado ? <CreateOrder id={userId || ''} /> : <></>}
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
