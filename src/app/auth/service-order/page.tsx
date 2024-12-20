'use client'

import { ReadOrder } from "@/components/ServiceOrder/readOrder";
import { CreateOrder } from "@/components/ServiceOrder/createOrder";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/context/auth";
import Loading from "@/app/loading";

export default function ServiceOrder() {
  const setoresAcessoPermitidos = ["FINANCEIRO", "VENDAS", "DIRETORIA", "OPERACIONAL"];
  const setoresCrudPermitido = ["VENDAS", "DIRETORIA"];
  const [crudAutorizado, setCrudAutorizado] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
      setoresCrudPermitido.includes(user.sector) ? setCrudAutorizado(true) : setCrudAutorizado(false);
    }
    setLoading(false);
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    setoresAcessoPermitidos.includes(user?.sector as string) ? (
      <div className="m-5 space-y-5">
        <div className="justify-between flex items-center">
          <h1 className="text-3xl font-bold">Lista de Ordens de Serviço:</h1>
          {crudAutorizado ? <CreateOrder id={userId || ''} /> : null}
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
