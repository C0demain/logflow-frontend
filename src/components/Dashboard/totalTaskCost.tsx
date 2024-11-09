import React, { useEffect, useState } from "react";
import { getTasks, TaskData } from "@/app/api/tasks/listTasks";
import { calculateProfit, calculateTotal, Order, totalCost } from "@/app/api/dashboardService/orderUtils";

interface TotalTaskCostProps {
  orderId: string;
  orders: Order[];
}


const TotalTaskCost: React.FC<TotalTaskCostProps> = ({ orderId, orders }) => {
  const [totalTaskCost, setTotalTaskCost] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar custos das tarefas
  const fetchTaskCosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getTasks(orderId, "", "", "", undefined);
      const tasks: TaskData[] = response.tasks;

      // Calcular o custo total das tarefas
      const totalCost = tasks.reduce((acc, task) => {
        const taskCost = task.taskCost ?? 0;
        return acc + (parseFloat(taskCost.toString()) || 0);
      }, 0);

      setTotalTaskCost(totalCost);

    } catch (err) {
      setError("Erro ao carregar os custos das tarefas.");
    } finally {
      setLoading(false);
    }
  };

  // Executa a função ao montar o componente ou quando `orderId` ou `orders` mudarem
  useEffect(() => {
    fetchTaskCosts();
  }, [orderId, orders.length]);

    useEffect(() => {
    fetchTaskCosts();
  }, [orderId, orders.length]);

  // Calcula o custo total dos pedidos usando o valor importado totalCost
  const profit = calculateProfit(orders, totalTaskCost)
  const totalOrdersCost = calculateTotal(orders); // Usando a função totalCost para calcular o custo total dos pedidos
  
  
  if (loading) return <div>Carregando...</div>;
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
