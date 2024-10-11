"use client";

import { updateOrder } from "@/app/api/orderService/updateOrder";
import { getTasks } from "@/app/api/tasks/listTasks";
import CreateTask from "@/components/TaskService/createTask";
import TodoList from "@/components/TaskService/todoList";
import { SetStateAction, useCallback, useEffect, useState } from "react";

interface TaskListProps {
  params: {
    userId: string;
    orderId: string;
  };
}

export default function TaskPage({ params }: TaskListProps) {
  const { userId, orderId } = params;
  const [taskFinanceiro, setTaskFinanceiro] = useState<any[]>([]);
  const [taskComercial, setTaskComercial] = useState<any[]>([]);
  const [taskOperacional, setTaskOperacional] = useState<any[]>([]);
  const [allTasksFinanceiroCompleted, setAllTasksFinanceiroCompleted] = useState<boolean>(false);
  const [allTasksComercialCompleted, setAllTasksComercialCompleted] = useState<boolean>(false);
  const [allTasksOperacionalCompleted, setAllTasksOperacionalCompleted] = useState<boolean>(false);

  const listTasks = useCallback(async () => {
    try {
      if (userId && orderId) {
        const responseComercial = await getTasks(orderId, 'COMERCIAL', userId, '');
        const responseOperacional = await getTasks(orderId, 'OPERACIONAL', userId, '');
        const responseFinanceiro = await getTasks(orderId, 'FINANCEIRO', userId, '');

        setTaskComercial(responseComercial.data.tasks);
        setTaskOperacional(responseOperacional.data.tasks);
        setTaskFinanceiro(responseFinanceiro.data.tasks);
      }
    } catch (error) {
      console.log('Erro para listar tarefas', error);
    }
  }, [userId, orderId]);

  const updateOrderSector = useCallback(async () => {
    try {
      if (!allTasksComercialCompleted) {
        await updateOrder({ sector: 'COMERCIAL', status: 'PENDENTE' }, orderId);
      } else if (!allTasksOperacionalCompleted) {
        await updateOrder({ sector: 'OPERACIONAL', status: 'PENDENTE' }, orderId);
      } else if (!allTasksFinanceiroCompleted) {
        await updateOrder({ sector: 'FINANCEIRO', status: 'PENDENTE' }, orderId);
      } else if (allTasksComercialCompleted && allTasksOperacionalCompleted && allTasksFinanceiroCompleted) {
        await updateOrder({ sector: 'FINALIZADO', status: 'FINALIZADO' }, orderId);
      }
    } catch (error) {
      console.error('Erro ao atualizar setor da ordem:', error);
    }
  }, [allTasksComercialCompleted, allTasksFinanceiroCompleted, allTasksOperacionalCompleted, orderId]);

  const handleAllTasksCompleted = () => {
    if (taskComercial.every(task => task.completed)) {
      setAllTasksComercialCompleted(true);
    }
    if (taskOperacional.every(task => task.completed)) {
      setAllTasksOperacionalCompleted(true);
    }
    if (taskFinanceiro.every(task => task.completed)) {
      setAllTasksFinanceiroCompleted(true);
    }
    updateOrderSector();
  }

  useEffect(() => {
    listTasks();
  }, [listTasks]);

  return (
    <div className="m-5 space-y-5">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Lista de Tarefas:</h1>
        <CreateTask userId={userId} orderId={orderId} />
      </div>
      <div className="flex flex-col space-y-5 sm:flex-row sm:space-y-0 sm:space-x-5">
        <TodoList
          sectorName="Comercial"
          userId={userId}
          orderId={orderId}
          tasks={taskComercial}
          onAllTasksCompleted={handleAllTasksCompleted}
        />
        <TodoList
          sectorName="Operacional"
          userId={userId}
          orderId={orderId}
          tasks={taskOperacional}
          onAllTasksCompleted={handleAllTasksCompleted}
        />
        <TodoList
          sectorName="Financeiro"
          userId={userId}
          orderId={orderId}
          tasks={taskFinanceiro}
          onAllTasksCompleted={handleAllTasksCompleted}
        />
      </div>
    </div>
  );
}
