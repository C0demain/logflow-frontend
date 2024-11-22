"use client";

import { AuthContext } from "@/app/context/auth";
import Loading from "@/app/loading";
import { useContext, useEffect, useState } from "react";
import TicketCards from "@/components/Dashboard/ticketCards";
import { Order } from "@/app/api/dashboardService/orderUtils";
import TotalTaskCost from "@/components/Dashboard/totalTaskCost";
import OrderCount from "@/components/Dashboard/orderCount";
import AccessWrapper from "@/components/Shared/AccessWrapper";
import OverdueOrdersCount from "@/components/Dashboard/overdueOrdersCount";
import OverdueTasksCount from "@/components/Dashboard/overdueTasksCount";
import { listOs } from "@/app/api/serviceOrder/listOrder";
import { DateFilterProvider } from "@/app/context/dashboard";
import TurnoverCards from "@/components/Dashboard/turnoverCards";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Função para buscar ordens com filtros de data
  const fetchOrders = async () => {
    try {
      const response = await listOs(null, null, null, true, null);
      setOrders(response);
      setFilteredOrders(response); // Inicializa com todas as ordens
    } catch (error) {
      console.error("Erro ao buscar ordens:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para filtrar as ordens com base nas datas
  const filterOrdersByDate = () => {
    if (!startDate && !endDate) {
      // Se não houver datas selecionadas, mostra todas as ordens
      setFilteredOrders(orders);
      return;
    }

    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.createdAt); // Ajuste de acordo com o campo de data da ordem
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && orderDate < start) return false;
      if (end && orderDate > end) return false;

      return true;
    });

    setFilteredOrders(filtered);
  };

  // Atualiza o filtro quando as datas forem alteradas
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
        <DateFilterProvider filters={ {startDate, endDate} }>
          <>
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
                <TicketCards/>
            </AccessWrapper>
            <AccessWrapper sectors={["FINANCEIRO", "DIRETORIA"]}>
                <TotalTaskCost />
            </AccessWrapper>
            <AccessWrapper sectors={["DIRETORIA"]}>
                <OverdueTasksCount />
            </AccessWrapper>
            <AccessWrapper sectors={["DIRETORIA"]}>
                <TurnoverCards/>
            </AccessWrapper>
          </>
        </DateFilterProvider>
      )}
    </div>

  );
}
