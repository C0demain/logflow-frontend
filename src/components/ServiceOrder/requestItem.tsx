"use client"
import React, { useEffect, useState } from "react";
import { StageLine } from "../Shared/stageLine";
import { DeleteOrder } from "./deleteOrder";
import Link from "next/link";
import { getTasks } from "@/app/api/tasks/listTasks";

interface RequestItemProps {
  name: string;
  status: string;
  orderId: string;
  sector: string | undefined;
  userId: string | undefined;
  clientName: string;
  price: number;
  crudAutorizado: boolean;
}

export interface taskForStage {
  key: string | undefined,
  value: boolean
}

export const RequestItem: React.FC<RequestItemProps> = ({
  name,
  status,
  orderId,
  sector,
  userId,
  clientName,
  price,
  crudAutorizado,
}) => {
  const [tasksList, setTasksList] = useState<taskForStage[]>()

  const fetchTasks = async () => {
    const response = await getTasks(orderId, "", "", "");
    console.log(response)
    if (response.tasks.length > 0) {
      const tasks: taskForStage[] = response?.tasks.map(task => ({
        key: task.title,
        value: task.completedAt !== null
      }))
      //console.log(tasks)
      setTasksList(tasks)
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 sm:p-5 rounded-md w-full bg-white shadow-lg transition-all hover:bg-gray-100">

  {/* Primeira Seção: Informações Básicas */}
  <div className="flex flex-col justify-between col-span-1 sm:col-span-1 mb-4 sm:mb-0">
    <div className="flex flex-col space-y-1 mb-4">
      <h1 className="text-lg sm:text-2xl font-bold">{name}</h1>
      <h1 className="text-base sm:text-lg">Cliente: {clientName}</h1>
      <h1 className="text-base sm:text-lg">Preço: {price}</h1>
    </div>
    {crudAutorizado && <DeleteOrder id={orderId} />}
  </div>

  {/* Segunda Seção: Linha de Etapas */}
  <div className="flex justify-center items-center col-span-1 sm:col-span-1">
    <StageLine tasks={tasksList} />
  </div>

  {/* Terceira Seção: Status e Links */}
  {userId && orderId && (
    <div className="flex flex-col col-span-1 w-full sm:items-end sm:text-right items-center text-center">
      
      {/* Status Badge */}
      <div className="flex justify-center mb-4">
        <div
          className={`badge h-6 ${status === "FINALIZADO" ? "badge-success" : "badge-info"
            }`}
        >
          <p className="text-sm sm:text-base font-medium">{status}</p>
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-col sm:flex-row items-center sm:items-end sm:space-x-1 mt-4 sm:mt-0 lg:mt-20">
        <Link
          className=" px-6 py-3 sm:px-4 sm:py-2 w-full sm:w-28 h-10 flex justify-center items-center rounded-md bg-blue-400 hover:bg-blue-500 transition-all mb-2 sm:mb-0"
          href={`/auth/history/${orderId}`}
        >
          Histórico
        </Link>
        <Link
          className="w-full sm:w-28 h-10 flex justify-center items-center rounded-md bg-blue-400 hover:bg-blue-500 transition-all"
          href={`/auth/to-do-list/${orderId}`}
        >
          Tarefas
        </Link>
      </div>
    </div>
  )}
</div>

  );
};
