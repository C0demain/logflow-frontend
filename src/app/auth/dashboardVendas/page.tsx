"use client"

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/context/auth";
import { listOs } from "@/app/api/orderService/listOrder";
import Loading from "@/app/loading";
import AverageCost from "@/components/averageCost"; // Ajuste o caminho conforme necessário
import { Order } from "@/app/api/dashboardService/orderUtils"; // Ajuste o caminho conforme necessário

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
      <h1 className="text-2xl">Dashboard Vendas:</h1>
      {loading ? (
        <Loading />
      ) : (
        <AverageCost orders={orders} />
      )}
    </div>
  );
}
