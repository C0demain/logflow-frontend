"use client"
import React, { useEffect, useState } from "react";
import { StageLine } from "../stageLine";
import { DeleteOrder } from "./deleteOrder";
import Link from "next/link";
import { Divider } from "@chakra-ui/react"

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
  const [stage1, setStage1] = useState(false);
  const [stage2, setStage2] = useState(false);
  const [stage3, setStage3] = useState(false);
  const [stage4, setStage4] = useState(false);
  const [stage5, setStage5] = useState(false);
  const [stage6, setStage6] = useState(false);

  const setSector = (sector: string | undefined) => {
    switch (sector) {
      case "FINANCEIRO":
        setStage3(true);
      case "OPERACIONAL":
        setStage2(true);
      case "VENDAS":
        setStage1(true);
        break;
      default:
        setStage1(false);
        setStage2(false);
        setStage3(false);
        break;
    }
  };

  useEffect(() => {
    setSector(sector);
  }, [sector]);

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
        <StageLine stage1={stage1} stage2={stage2} stage3={stage3} />
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
