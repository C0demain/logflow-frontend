"use client"
import React, { useEffect, useState } from "react";
import { StageLine } from "../stageLine";
import { DeleteOrder } from "./deleteOrder";
import Link from "next/link";
import { Divider } from "@chakra-ui/react"
import { getTasks, TaskData } from "@/app/api/tasks/listTasks";

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

export interface taskForStage{
  key: string,
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

  const fetchTasks = async() => {
    const response = await getTasks(orderId, "", "", "", "");
    if(response.tasks.length > 0){
      const tasks: taskForStage[] = response?.tasks.map(task=>({
        key: task.title,
        value: task.completedAt !== null
      }))
      console.log(tasks)
      setTasksList(tasks)
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row p-4 sm:p-5 rounded-md w-full bg-white shadow-lg transition-all hover:bg-gray-100">
  
      <div className="w-full flex flex-col justify-between mb-4 sm:mb-0 sm:mr-4">
        <div className="flex flex-col space-y-1 mb-4">
          <h1 className="text-lg sm:text-2xl font-bold">{name}</h1>
          <h1 className="text-base sm:text-lg">Cliente: {clientName}</h1>
          <h1 className="text-base sm:text-lg">Preço: {price}</h1>
        </div>

        {crudAutorizado && <DeleteOrder id={orderId} />}
      </div>

  
      <div className="flex justify-center items-center mb-4 sm:mb-0 sm:mr-4">
        <StageLine tasks={tasksList} />
      </div>

 
      {userId && orderId && (
        <div className="flex sm:flex-col items-center sm:items-end w-full sm:justify-between">
          <div className="flex justify-center mb-4">
            <div
              className={`badge h-6 ${
                status === "FINALIZADO" ? "badge-success" : "badge-info"
              }`}
            >
              <p className="text-sm sm:text-base font-medium">{status}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:self-end sm:space-x-1 mt-4 sm:mt-0"> {/* Espaçamento reduzido apenas em telas grandes */}
            <Link
              className="w-full sm:w-28 h-10 flex justify-center items-center rounded-md bg-blue-400 hover:bg-blue-500 transition-all mb-2 sm:mb-0"
              href={`/auth/history`}
            >
              Histórico
            </Link>
            <Link
              className="w-full sm:w-28 h-10 flex justify-center items-center rounded-md bg-blue-400 hover:bg-blue-500 transition-all"
              href={`/auth/todolist/${userId}/${orderId}`}
            >
              Tarefas
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
