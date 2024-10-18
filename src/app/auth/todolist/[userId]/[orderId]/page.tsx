"use client";

import { updateOrder } from "@/app/api/orderService/updateOrder";
import { getTasks } from "@/app/api/tasks/listTasks";
import Loading from "@/app/loading";
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
        (await getTasks(params.orderId, "VENDAS", "", "")).tasks,
        (await getTasks(params.orderId, "OPERACIONAL", "", "")).tasks,
        (await getTasks(params.orderId, "FINANCEIRO", "", "")).tasks,
      ]);

    // Mover as 5 primeiras tarefas do Operacional para Vendas
    const tasksToMove = responseOperacional.slice(0, 5);
    const updatedOperacional = responseOperacional.slice(5);
    const updatedVendas = [...responseVendas, ...tasksToMove];

    const tasksVendasCompleted = updatedVendas.every((task) => task.completed);
    const tasksOperacionalCompleted = updatedOperacional.every((task) => task.completed);
    const tasksFinanceiroCompleted = responseFinanceiro.every((task) => task.completed);

    if (!tasksVendasCompleted) {
      await updateOrder(
        { sector: "VENDAS", status: "ATIVO" },
        params.orderId
      );
    } else if (!tasksOperacionalCompleted) {
      await updateOrder(
        { sector: "OPERACIONAL", status: "ATIVO" },
        params.orderId
      );
    } else if (!tasksFinanceiroCompleted) {
      await updateOrder(
        { sector: "FINANCEIRO", status: "ATIVO" },
        params.orderId
      );
    } else {
      await updateOrder(
        { sector: "FINANCEIRO", status: "FINALIZADO" },
        params.orderId
      );
    }

    return {
      vendas: updatedVendas,
      operacional: updatedOperacional,
      financeiro: responseFinanceiro,
    };
  }

  const { data, error, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  if (error) {
    return (
      <div className="flex w-full justify-center items-center">
        <p className="text-2xl text-red-600">Erro ao listar tarefas</p>
      </div>
    );
  }
  if (!data) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Lista de Tarefas:</h1>
        <CreateTask userId={params.userId} orderId={params.orderId} />
      </div>
      <div className="flex flex-col justify-center w-full sm:flex-row sm:space-y-0 sm:space-x-5 sm:w-full">
        <TodoList onUpdateTaskList={refetch} name="de Coleta" sectorName="VENDAS" tasks={data.vendas} />
        <TodoList onUpdateTaskList={refetch} name="de Entrega" sectorName="OPERACIONAL" tasks={data.operacional} />
        <TodoList onUpdateTaskList={refetch} name="de Faturamento" sectorName="FINANCEIRO" tasks={data.financeiro} />
      </div>
    </div>
  );
}
