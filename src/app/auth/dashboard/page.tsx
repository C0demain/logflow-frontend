"use client";

import { AuthContext } from "@/app/context/auth";
import { listOs } from "@/app/api/orderService/listOrder"; // Importa a função para listar ordens
import Loading from "@/app/loading"; // Importa o componente de loading
import { useContext, useEffect, useState } from "react";
import CostCards from "@/components/costCards";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar as ordens de serviço
  const fetchOrders = async () => {
    try {
      const response = await listOs(null, null, null, true, null);
      setOrders(response);
    } catch (error) {
      console.error("Erro ao buscar ordens:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(); // Chama a função ao carregar o componente
  }, []);

  return (
    <div className="m-5 space-y-5">
      <div className="justify-between flex items-center">
        <h1 className="text-2xl">Dashboard:</h1>
      </div>
      {loading ? (
        <Loading /> // Exibe o componente de loading enquanto busca os dados
      ) : (
        <>
          <div className="overflow-x-auto">
            <CostCards orders={orders} /> {/* Passa as ordens para o componente AverageCost */}
          </div>
        </>
      )}
    </div>
  );
}
