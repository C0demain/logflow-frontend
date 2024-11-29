"use client";

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/app/context/auth";
import Loading from "@/app/loading";
import TicketCards from "@/components/Dashboard/ticketCards";
import { Order } from "@/app/api/dashboardService/orderUtils";
import TotalTaskCost from "@/components/Dashboard/totalTaskCost";
import OrderCount from "@/components/Dashboard/orderCount";
import dynamic from "next/dynamic";
import { listOs } from "@/app/api/serviceOrder/listOrder";
import { DateFilterProvider } from "@/app/context/dashboard";
import CompletedOrdersChart from "@/components/Charts/CompletedOrdersChart";



// Importar componentes dinamicamente para evitar SSR
const AccessWrapper = dynamic(() => import('@/components/Shared/AccessWrapper'), { ssr: false });
const OrdersChart = dynamic(() => import('@/components/Charts/OrdersChart'), { ssr: false });
const OverdueOrdersCount = dynamic(() => import('@/components/Dashboard/overdueOrdersCount'), { ssr: false });
const OverdueTasksCount = dynamic(() => import('@/components/Dashboard/overdueTasksCount'), { ssr: false });
const TurnoverCards = dynamic(() => import('@/components/Dashboard/turnoverCards'), { ssr: false });
const SpentAndEarnedChart = dynamic(() => import("@/components/Charts/SpentAndEarnedChart"), {ssr: false})

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const fetchOrders = async () => {
    if (typeof window === "undefined") return; // Proteção contra SSR

    try {
      const response = await listOs(null, null, null, true, null);
      setOrders(response);
      setFilteredOrders(response);
    } catch (error) {
      console.error("Erro ao buscar ordens:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterOrdersByDate = () => {
    if (!startDate && !endDate) {
      setFilteredOrders(orders);
      return;
    }

    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && orderDate < start) return false;
      if (end && orderDate > end) return false;

      return true;
    });

    setFilteredOrders(filtered);
  };

  useEffect(() => {
    filterOrdersByDate();
  }, [startDate, endDate, orders]);

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="m-5 space-y-5">
      <h1 className="text-2xl">Dashboard Geral:</h1>
      {loading ? (
        <Loading />
      ) : (
        <DateFilterProvider filters={{ startDate, endDate }}>
          <div className="space-y-3">
            {/* Filtro de Data */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <div>
                <label className="block text-sm font-medium text-gray-700">Data Início</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Data Fim</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <br />
          </div>
          <AccessWrapper sectors={["FINANCEIRO", "DIRETORIA"]}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 w-full">
              <OrderCount />
              <OverdueOrdersCount />
            </div>
          </AccessWrapper>
          <AccessWrapper sectors={["FINANCEIRO", "VENDAS", "DIRETORIA"]}>
            <TicketCards />
          </AccessWrapper>
          <AccessWrapper sectors={["FINANCEIRO", "DIRETORIA"]}>
            <TotalTaskCost />
          </AccessWrapper>
          <AccessWrapper sectors={["DIRETORIA"]}>
            <TurnoverCards />
            <OverdueTasksCount />
            <OrdersChart />
            <CompletedOrdersChart />
          </AccessWrapper>
          <AccessWrapper sectors={["FINANCEIRO", "VENDAS", "DIRETORIA"]}>
            <SpentAndEarnedChart/>
          </AccessWrapper>
        </DateFilterProvider>
      )}
    </div>
  );
}
