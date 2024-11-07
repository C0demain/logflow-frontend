"use client"

import { AuthContext } from "@/app/context/auth";
import { listOs } from "@/app/api/orderService/listOrder"; // Importa a função para listar ordens
import Loading from "@/app/loading"; // Importa o componente de loading
import { useContext, useEffect, useState } from "react";
import CostCards from "@/components/Dashboard/costCards";
import { Order } from "@/app/api/dashboardService/orderUtils";
import TotalTaskCost from "@/components/totalTaskCost";
import ProfitCalculator from "@/components/profit";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

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
    fetchOrders();
  }, []);

  return (
    <div className="m-5 space-y-5">
      <h1 className="text-2xl">Dashboard Geral:</h1>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="overflow-x-auto">
            <CostCards orders={orders} /> {/* Passa as ordens para o componente AverageCost */}
            <br></br>
            <TotalTaskCost orderId={""} orders={[]} />
            <br></br>
            <ProfitCalculator orders={[]} totalTaskCost={0} />


          </div>
        </>
      )}
    </div>
  );
}
