"use client";

import { updateOrder } from "@/app/api/serviceOrder/updateOrder";
import { getTasks } from "@/app/api/tasks/listTasks";
import { TaskProvider } from "@/app/context/task";
import Loading from "@/app/loading";
import { HeaderOrderService } from "@/components/ServiceOrder/headerOrderService";
import { ReadUnitTask } from "@/components/TaskService/readUnitTask";
import TodoList from "@/components/TaskService/todoList";
import { Task } from "@/interfaces/task";
import { useQuery } from "@tanstack/react-query";

interface TaskListProps {
  params: {
    orderId: string;
  };
}


async function fetchTasks({ queryKey }: { queryKey: [string, { orderId: string }] }): Promise<{ [key: string]: Task[] }> {
  const [, { orderId }] = queryKey;

  // Faz uma única requisição para obter todas as tarefas
  const { tasks }: { tasks: Task[] } = await getTasks(orderId, "", "", "");
  // Define os diferentes "stages"
  const stages = [
    "EMISSÃO DE DOCUMENTOS DE COLETA",
    "COLETA",
    "EMISSÃO DE DOCUMENTOS DE ENTREGA",
    "ENTREGA",
    "CONFIRMAÇÃO DE ENTREGA",
    "CONFERÊNCIA DE ORÇAMENTO"
  ];

  // Inicializa tasksByStage com o tipo correto
  const tasksByStage: { [key: string]: Task[] } = {};

  // Separa as tarefas de acordo com o "stage"
  stages.forEach(stage => {
    tasksByStage[stage] = tasks.filter(task => task.stage === stage);
  });

  // Verifica se todas as tarefas de cada "stage" estão concluídas
  const stagesCompletion: { [key: string]: boolean } = {};
  stages.forEach(stage => {
    stagesCompletion[stage] = tasksByStage[stage].every(task => task.completedAt !== null);
  });

  return tasksByStage;
}

export default function TaskPage({ params }: TaskListProps) {
  const { orderId } = params;

  const { data, error, refetch } = useQuery({
    queryKey: ["fetchTasks", { orderId }],
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
    <div className="flex flex-col h-full">
      <HeaderOrderService orderId={orderId} />
      <TaskProvider>
        <div className="flex flex-col sm:flex-row justify-between sm:space-x-2 w-full h-full">
          <div className="flex flex-col sm:w-1/2 w-full space-y-2 h-full overscroll-contain overflow-y-auto">
            <TodoList onUpdateTaskList={refetch} sectorName="EMISSÃO DE DOCUMENTOS DE COLETA" tasks={data["EMISSÃO DE DOCUMENTOS DE COLETA"]} />
            <TodoList onUpdateTaskList={refetch} sectorName="COLETA" tasks={data["COLETA"]} />
            <TodoList onUpdateTaskList={refetch} sectorName="EMISSÃO DE DOCUMENTOS DE ENTREGA" tasks={data["EMISSÃO DE DOCUMENTOS DE ENTREGA"]} />
            <TodoList onUpdateTaskList={refetch} sectorName="ENTREGA" tasks={data["ENTREGA"]} />
            <TodoList onUpdateTaskList={refetch} sectorName="CONFERÊNCIA DE ORÇAMENTO" tasks={data["CONFERÊNCIA DE ORÇAMENTO"]} />
          </div>
          <div className="sm:w-1/2 w-full h-full mt-4 sm:mt-0">
            <ReadUnitTask myTask={false}/>
          </div>
        </div>
      </TaskProvider>
    </div>
  );
}
