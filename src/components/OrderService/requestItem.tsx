import React, { useEffect, useState } from "react";
import { StageLine } from "../stageLine";
import { DeleteOrder } from "./deleteOrder";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

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
        break;
      case "OPERACIONAL":
        setStage2(true);
        break;
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
    <div className="flex flex-row p-4 sm:p-5 rounded-md w-full h-1/5 bg-white shadow-lg transition-all hover:bg-gray-100">
      <div className="w-full flex flex-col justify-between">
        <div className="flex flex-col space-y-1 mb-5">
          <h1 className="text-lg sm:text-2xl font-bold">{name}</h1>
          <h1 className="text-base sm:text-bg text-justify">Cliente: {clientName}</h1>
          <h1 className="text-base sm:text-bg text-justify">Preço: {price}</h1>
        </div>
        {crudAutorizado ? <DeleteOrder id={orderId} /> : null}
      </div>

      <div className="flex justify-center items-center">
        <StageLine stage1={stage1} stage2={stage2} stage3={stage3} />
      </div>
      <div className="flex flex-col justify-between items-end w-full">
        <div
          className={
            status === "FINALIZADO"
              ? "badge badge-success h-6"
              : "badge badge-info h-6"
          }
        >
          <p className="text-sm sm:text-base font-medium">{status}</p>
        </div>
        {userId && orderId ? (
          <Link href={`/auth/todolist/${userId}/${orderId}`}>
            <FaAngleRight className="text-4xl sm:text-6xl w-full h-full" />
          </Link>
        ) : null}
      </div>
    </div>
  );
};
