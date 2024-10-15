"use client";

import { updateOrder } from "@/app/api/orderService/updateOrder";
import { getTasks } from "@/app/api/tasks/listTasks";
import CreateTask from "@/components/TaskService/createTask";
import TodoList from "@/components/TaskService/todoList";
import { useQuery } from "@tanstack/react-query";

interface TaskListProps {
  params: {
    userId: string;
    orderId: string;
  };
}

export default function TaskPage({ params }: TaskListProps) {
  async function fetchTasks() {
    const [responseVendas, responseOperacional, responseFinanceiro] =
      await Promise.all([
        (await getTasks(params.orderId, "VENDAS", params.userId, "")).tasks,
        (await getTasks(params.orderId, "OPERACIONAL", params.userId, "")).tasks,
        (await getTasks(params.orderId, "FINANCEIRO", params.userId, "")).tasks,
      ]);
    const tasksVendasCompleted = responseVendas.every((task) => task.completed);
    const tasksOperacionalCompleted = responseOperacional.every(
      (task) => task.completed
    );
    const tasksFinanceiroCompleted = responseFinanceiro.every(
      (task) => task.completed
    );

    if (!tasksVendasCompleted) {
      await updateOrder(
        { sector: "VENDAS", status: "PENDENTE" },
        params.orderId
      );
    } else if (!tasksOperacionalCompleted) {
      await updateOrder(
        { sector: "OPERACIONAL", status: "PENDENTE" },
        params.orderId
      );
    } else if (!tasksFinanceiroCompleted) {
      await updateOrder(
        { sector: "FINANCEIRO", status: "PENDENTE" },
        params.orderId
      );
    } else {
      await updateOrder(
        { sector: "FINANCEIRO", status: "FINALIZADO" },
        params.orderId
      );
    }

    return {
      vendas: responseVendas,
      operacional: responseOperacional,
      financeiro: responseFinanceiro,
    };
  }

  const { data, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  if (error) {
    return <div>Erro ao listar tarefas</div>;
  }
  if (!data) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Lista de Tarefas:</h1>
        <CreateTask userId={params.userId} orderId={params.orderId} />
      </div>
      <div className="flex flex-col justify-center w-full sm:flex-row sm:space-y-0 sm:space-x-5 sm:w-full">
        <TodoList
          sectorName="Vendas"
          tasks={data.vendas}
        />
        <TodoList
          sectorName="Operacional"
          tasks={data.operacional}
        />
        <TodoList
          sectorName="Financeiro"
          tasks={data.financeiro}
        />
      </div>
    </div>
  );
}
