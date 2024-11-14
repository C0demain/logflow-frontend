"use client";

import { updateOrder } from "@/app/api/serviceOrder/updateOrder";
import { getTasks, TaskData } from "@/app/api/tasks/listTasks";
import { TaskProvider } from "@/app/context/task";
import Loading from "@/app/loading";
import { HeaderOrderService } from "@/components/ServiceOrder/headerOrderService";
import { ReadUnitTask } from "@/components/TaskService/readUnitTask";
import TodoList from "@/components/TaskService/todoList";
import { useQuery } from "@tanstack/react-query";

interface TaskListProps {
  params: {
    userId: string;
    orderId: string;
  };
}

interface Task {
  id: string;
  stage: string;
  completedAt: string | null;
  // Adicione outros campos relevantes aqui
}

async function fetchTasks({ queryKey }: { queryKey: [string, { orderId: string }] }): Promise<{ [key: string]: TaskData[] }> {
  const [, { orderId }] = queryKey;

  // Faz uma única requisição para obter todas as tarefas
  const { tasks }: { tasks: TaskData[] } = await getTasks(orderId, "", "", "", "");
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
  const tasksByStage: { [key: string]: TaskData[] } = {};

  // Separa as tarefas de acordo com o "stage"
  stages.forEach(stage => {
    tasksByStage[stage] = tasks.filter(task => task.stage === stage);
  });

  // Verifica se todas as tarefas de cada "stage" estão concluídas
  const stagesCompletion: { [key: string]: boolean } = {};
  stages.forEach(stage => {
    stagesCompletion[stage] = tasksByStage[stage].every(task => task.completedAt !== null);
  });

  // Atualiza o status da ordem com base na conclusão das tarefas
  if (!stagesCompletion["EMISSÃO DE DOCUMENTOS DE COLETA"]) {
    await updateOrder({ sector: "VENDAS", status: "ATIVO" }, orderId);
  } else if (!stagesCompletion["COLETA"]) {
    await updateOrder({ sector: "VENDAS", status: "ATIVO" }, orderId);
  } else if (!stagesCompletion["EMISSÃO DE DOCUMENTOS DE ENTREGA"]) {
    await updateOrder({ sector: "OPERACIONAL", status: "ATIVO" }, orderId);
  } else if (!stagesCompletion["ENTREGA"]) {
    await updateOrder({ sector: "OPERACIONAL", status: "ATIVO" }, orderId);
  } else if (!stagesCompletion["CONFIRMAÇÃO DE ENTREGA"]) {
    await updateOrder({ sector: "FINANCEIRO", status: "ATIVO" }, orderId);
  } else if (!stagesCompletion["CONFERÊNCIA DE ORÇAMENTO"]) {
    await updateOrder({ sector: "FINANCEIRO", status: "FINALIZADO" }, orderId);
  } else {
    await updateOrder({ sector: "FINANCEIRO", status: "FINALIZADO" }, orderId);
  }

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
            <ReadUnitTask />
          </div>
        </div>
      </TaskProvider>
    </div>
  );
}
