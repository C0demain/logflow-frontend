import React, { useEffect, useState } from "react";
import { StageLine } from "../stageLine";
import { DeleteOrder } from "./deleteOrder";
import Link from "next/link";
import { FaAngleDown, FaAngleRight, FaAngleUp } from "react-icons/fa";
import { OrderHistory } from "./orderHistory";

interface RequestItemProps {
  name: string;
  status: string;
  orderId: string;
  sector: string | undefined;
  userId: string | undefined;
  clientName: string;
  userName: string;
  logs: { changedTo: string; atDate: string }[];
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
}) => {
  const [stage1, setStage1] = useState(false);
  const [stage2, setStage2] = useState(false);
  const [stage3, setStage3] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const setSector = (sector: string | undefined) => {
    switch (sector) {
      case "FINANCEIRO":
        setStage3(true);
      case "OPERACIONAL":
        setStage2(true);
      case "VENDAS":
        setStage1(true);
    }
  };

  useEffect(() => {
    setSector(sector);
  }, [sector]);

  return (
    <div className="grid grid-cols-4 grid-rows-[auto,1fr] rounded-box p-5 space-y-5 sm:5/6 md:5/6 lg:w-5/6 h-2/5 bg-white transition hover:shadow-lg border-2 border-transparent hover:bg-gray-50 hover:border-2 hover:border-info">
      <div className="col-span-4 row-span-1 w-full mb-5 flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{name}</h1>
          <h1 className="text-xl text-justify">Cliente: {clientName}</h1>
        </div>
        <div
          className={
            status === "FINALIZADO"
              ? "badge badge-success h-6"
              : "badge badge-info h-6"
          }
        >
          <p className="font-medium">{status}</p>
        </div>
      </div>
      <div className="col-span-1 row-span-1 space-y-7">
        <DeleteOrder id={orderId} />
      </div>
      <div className="col-span-2 row-span-1 flex justify-center items-center">
        <StageLine stage1={stage1} stage2={stage2} stage3={stage3} />
      </div>
      <div className="col-span-1 row-span-1 flex justify-end items-center w-full">
        <Link href={`/auth/todolist/${userId}/${orderId}`}>
          <FaAngleRight className="text-6xl w-full h-full" />
        </Link>
      </div>
      <div className="col-span-4 flex justify-around row-span-1 w-full">
        <button className="btn btn-ghost btn-circle btn-sm" onClick={() => setShowHistory(!showHistory)}>
          {showHistory ? <FaAngleUp/> : <FaAngleDown />}
        </button>
      </div>
      {showHistory ? (
        <div className="col-span-4">
          <h2 className="text-lg text-center font-bold">Histórico</h2>
          <ul className="steps steps-vertical">
            {logs.map((log) => (
              <li
                key={log.atDate}
                className="step step-info h-1"
                data-content=""
              >
                {log.atDate} - Ordem movida para {log.changedTo}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
