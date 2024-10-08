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
  const [completedSectors, setCompletedSectors] = useState<string[]>([]);

  const listTasks = useCallback(async () => {
    try {
      if (userId && orderId) {
        const response = await getTasks(orderId, '', '');
        separateData(response.data.tasks);
      }
    } catch (error) {
      console.log('Erro para listar tarefas', error);
    }
  }, [userId, orderId]);

  const updateOrderSector = useCallback(async () => {
    try {
      if (!completedSectors.includes('Comercial')) {
        await updateOrder({sector: 'COMERCIAL', status: 'PENDENTE'}, orderId);
      } else if (!completedSectors.includes('Operacional')) {
        await updateOrder({sector: 'OPERACIONAL', status: 'PENDENTE'}, orderId);
      } else if (!completedSectors.includes('Financeiro')) {
        await updateOrder({sector: 'FINANCEIRO', status: 'PENDENTE'}, orderId);
      } else if (completedSectors.length === 3) {
        await updateOrder({status: 'FINALIZADO'}, orderId);
      }
    } catch (error) {
      console.error('Erro ao atualizar setor da ordem:', error);
    }
  }, [completedSectors, orderId]);

  function separateData(data: any[]) {
    const taskFinanceiroInit: SetStateAction<any[]> = [];
    const taskOperacionalInit: SetStateAction<any[]> = [];
    const taskComercialInit: SetStateAction<any[]> = [];

    data.forEach((e) => {
      if (e.sector === 'OPERACIONAL') {
        taskOperacionalInit.push(e);
      } else if (e.sector === 'FINANCEIRO') {
        taskFinanceiroInit.push(e);
      } else {
        taskComercialInit.push(e);
      }
    });

    setTaskOperacional(taskOperacionalInit);
    setTaskFinanceiro(taskFinanceiroInit);
    setTaskComercial(taskComercialInit);
  }

  useEffect(() => {
    listTasks();
    updateOrderSector();
  }, [listTasks, completedSectors, updateOrderSector]);

  const handleAllTasksCompleted = (sectorName: string) => {
    // Adiciona o setor apenas se ainda não estiver na lista
    setCompletedSectors((prev) => 
      prev.includes(sectorName) ? prev : [...prev, sectorName]
    );
  };



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
      {completedSectors.length > 0 && (
        <div>
          <h2>Setores com todas as tarefas concluídas:</h2>
          <ul>
            {completedSectors.map(sector => (
              <li key={sector}>{sector}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
