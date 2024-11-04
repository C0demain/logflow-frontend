"use client";

import { AuthContext } from "@/app/context/auth";
import AverageCost from "@/components/averageCost";
import { listOs } from "@/app/api/orderService/listOrder"; // Importa a função para listar ordens
import Loading from "@/app/loading"; // Importa o componente de loading
import { useContext, useEffect, useState } from "react";

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

  const calculateTotalCost = (orders: any[]) => {
    return orders.reduce((acc, order) => acc + (order.value || 0), 0); // Garante que order.value é um número
  };

  const calculateAverageCost = (orders: any[]) => {
    if (orders.length === 0) return 0; // Evita divisão por zero
    const total = calculateTotalCost(orders);
    return total / orders.length; // Retorna a média
  };

  const totalCost = calculateTotalCost(orders); // Cálculo do custo total
  const averageCost = calculateAverageCost(orders); // Cálculo do custo médio

  // Exibe os valores no console, com verificação se são números
  console.log("Custo Total:", typeof totalCost === 'number' ? totalCost.toFixed(2) : "N/A");
  console.log("Custo Médio:", typeof averageCost === 'number' ? averageCost.toFixed(2) : "N/A");

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
            <AverageCost orders={orders} /> {/* Passa as ordens para o componente AverageCost */}
          </div>
          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Custo Médio</h2>
              <p className="text-2xl mt-2">R$ {averageCost.toFixed(2)}</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Custo Total</h2>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
