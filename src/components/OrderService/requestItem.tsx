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
    <div className="flex flex-col sm:flex-row p-4 sm:p-5 rounded-md w-full h-auto bg-white shadow-lg transition-all hover:bg-gray-100">
     
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

 
        <div className="flex flex-col items-center sm:items-end w-full space-y-4 sm:space-y-0 sm:justify-between">
          <div
            className={`badge h-6 ${
              status === "FINALIZADO" ? "badge-success" : "badge-info"
            }`}
           >
            <p className="text-sm sm:text-base font-medium">{status}</p>
        </div>

        {userId && orderId && (
          <div className="flex flex-col sm:flex-row w-full sm:w-auto bg-blue-600 rounded-md h-auto sm:h-1/3">
            <Link
              className="w-full sm:w-3/5 h-10 flex justify-center items-center rounded-md bg-blue-600 hover:bg-blue-500 transition-all"
              href={`/auth/history`}
            >
              Histórico
            </Link>
            <Divider orientation="horizontal" size="lg" className="sm:h-full" />
            <Link
              className="w-full sm:w-3/5 h-10 flex justify-center items-center rounded-md bg-blue-600 hover:bg-blue-500 transition-all"
              href={`/auth/todolist/${userId}/${orderId}`}
            >
              Tarefas
            </Link>
          </div>
        )}
    </div>
</div>

  );
};
