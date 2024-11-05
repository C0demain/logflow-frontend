'use client';

import { ReadOrder } from "@/components/OrderService/readOrder";
import { CreateOrder } from "@/components/OrderService/createOrder";
import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "@/app/context/auth";
import Loading from "@/components/Shared/loading";

const setoresAcessoPermitidos = ["FINANCEIRO", "VENDAS", "DIRETORIA", "OPERACIONAL"];
const setoresCrudPermitido = ["VENDAS", "DIRETORIA"];

export default function ServiceOrder() {
  const [crudAutorizado, setCrudAutorizado] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Chave para forçar atualização

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  // Função de atualização para forçar o reload da lista
  const refreshOrders = useCallback(() => {
    setRefreshKey((prevKey) => prevKey + 1);
  }, []);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
      setoresCrudPermitido.includes(user.sector) ? setCrudAutorizado(true) : setCrudAutorizado(false);
    }
    setLoading(false);
  }, [user]);

  if (loading) {
    return <div><Loading /></div>;
  }

  return (
    setoresAcessoPermitidos.includes(user?.sector as string) ? (
      <div className="m-5 space-y-5">
        <div className="justify-between flex items-center">
          <h1 className="text-2xl">Lista de Ordens de Serviço:</h1>
          {crudAutorizado ? 
            <CreateOrder 
              id={userId} 
              onClose={() => (document.getElementById("modal") as HTMLDialogElement).close()}
              refreshOrders={refreshOrders} 
            /> 
            : 
            <></>}
        </div>

        <div className="overflow-x-auto">
          <ReadOrder 
            autorizado={crudAutorizado} 
            userId={userId} 
            key={refreshKey}  
          />
        </div>
      </div>
    ) : (
      <div className="flex justify-center items-center h-full">Você não tem permissão para acessar esta página.</div>
    )

  );
}
