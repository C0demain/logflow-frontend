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
  userName: string;
  logs: { changedTo: string; atDate: string }[];
  crudAutorizado: boolean;
}

export const RequestItem: React.FC<RequestItemProps> = ({
  name,
  status,
  orderId,
  sector,
  userId,
  clientName,
  userName,
  logs,
  crudAutorizado,
}) => {
  const [stage1, setStage1] = useState(false);
  const [stage2, setStage2] = useState(false);
  const [stage3, setStage3] = useState(false);

  const setSector = (sector: string | undefined) => {
    switch (sector) {
      case "FINANCEIRO":
        setStage3(true);
      // Use `break` to avoid fall-through
      case "OPERACIONAL":
        setStage2(true);
      // Use `break` to avoid fall-through
      case "VENDAS":
        setStage1(true);
      // Use `break` to avoid fall-through
    }
  };

  useEffect(() => {
    setSector(sector);
  }, [sector]);

  return (
    <div className="grid grid-cols-4 grid-rows-[auto,1fr] p-4 sm:p-5 rounded-md space-y-4 sm:space-y-5 w-full h-1/5 bg-white shadow-lg transition-all hover:bg-gray-100">
      <div className="col-span-4 row-span-1 w-full mb-4 sm:mb-5 flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-lg sm:text-2xl font-bold">{name}</h1>
          <h1 className="text-base sm:text-xl text-justify">Cliente: {clientName}</h1>
        </div>
        <div
          className={
            status === "FINALIZADO"
              ? "badge badge-success h-6"
              : "badge badge-info h-6"
          }
        >
          <p className="text-sm sm:text-base font-medium">{status}</p>
        </div>
      </div>
      <div className="col-span-1 row-span-1 space-y-4 sm:space-y-7">
        {crudAutorizado ? <DeleteOrder id={orderId} /> : null}
      </div>
      <div className="col-span-2 row-span-2 flex justify-center items-center">
        <StageLine stage1={stage1} stage2={stage2} stage3={stage3} />
      </div>
      <div className="col-span-1 row-span-1 flex justify-end items-center w-full">
        {userId && orderId ? (
          <Link href={`/auth/todolist/${userId}/${orderId}`}>
            <FaAngleRight className="text-4xl sm:text-6xl w-full h-full" />
          </Link>
        ) : null}
      </div>
    </div>
  );
};
