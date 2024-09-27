"use client";

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
  const [taskAdministrativo, setTaskAdministrativo] = useState<any[]>([]);
  const [completedSectors, setCompletedSectors] = useState<string[]>([]);

  const sectors = ['Comercial', 'Administrativo', 'Financeiro'];

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

  function separateData(data: any[]) {
    const taskFinanceiroInit: SetStateAction<any[]> = [];
    const taskAdministrativoInit: SetStateAction<any[]> = [];
    const taskComercialInit: SetStateAction<any[]> = [];

    data.forEach((e) => {
      if (e.sector === 'ADMINISTRATIVO') {
        taskAdministrativoInit.push(e);
      } else if (e.sector === 'FINANCEIRO') {
        taskFinanceiroInit.push(e);
      } else {
        taskComercialInit.push(e);
      }
    });

    setTaskAdministrativo(taskAdministrativoInit);
    setTaskFinanceiro(taskFinanceiroInit);
    setTaskComercial(taskComercialInit);
  }

  useEffect(() => {
    listTasks();
  }, [listTasks]);

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
          sectorName="Administrativo"
          userId={userId}
          orderId={orderId}
          tasks={taskAdministrativo}
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
