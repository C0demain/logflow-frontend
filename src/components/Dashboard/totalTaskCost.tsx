import React, { useContext, useEffect, useState } from "react";
import { getTasks, TaskData } from "@/app/api/tasks/listTasks";
import { calculateProfit, calculateTotal, Order, totalCost } from "@/app/api/dashboardService/orderUtils";
import Loading from "@/app/loading";
import { getOrdersStats } from "@/app/api/dashboardService/getOrdersStats";
import { DateFilterContext } from "@/app/context/dashboard";


const TotalTaskCost: React.FC = () => {
  const {startDate, endDate} = useContext(DateFilterContext)
  const [totalTaskCost, setTotalTaskCost] = useState<number>(0);
  const [profit, setProfit] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar custos das tarefas
  const fetchTaskCosts = async () => {
    try {
      const response = await getOrdersStats({dateFrom: startDate, dateTo: endDate});

      setTotalTaskCost(Number(response.totalTaskCost));
      setProfit(Number(response.profit))
      setLoading(false)

    } catch (err) {
      setError("Erro ao carregar os custos das tarefas.");
    } finally {
      setLoading(false);
    }
  };

  // Executa a função ao montar o componente ou quando `orderId` ou `orders` mudarem
  useEffect(() => {
    fetchTaskCosts();
  }, [startDate, endDate]);


  if (loading) return <Loading/>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
      {/* Card para Custo Total das Tarefas */}
      <div className="card bg-base-100 shadow-xl w-full">
        <div className="card-body">
          <h2 className="card-title">Custo Total das Tarefas</h2>
          <p className="text-2xl mt-2">R$ {totalTaskCost.toFixed(2)}</p>
        </div>
      </div>

      {/* Card para Lucro Total */}
      <div className="card bg-base-100 shadow-xl w-full">
        <div className="card-body">
          <h2 className="card-title">Lucro Total</h2>
          <p className="text-2xl mt-2">R$ {profit.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default TotalTaskCost;
