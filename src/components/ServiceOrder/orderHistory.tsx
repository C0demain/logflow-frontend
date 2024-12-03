import { listServiceOrderLogs } from "@/app/api/serviceOrderLogs/listOrderLogs";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

interface Log {
  id: number;
  action: string;
  creationDate: string;
}

export default function OrderHistory({ orderId }: { orderId: string }) {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  dayjs.locale("pt-br");

  useEffect(() => {
    listServiceOrderLogs("", orderId)
      .then((logs) => setLogs(logs))
      .catch((error) => console.error("Error fetching logs:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="m-5 space-y-5">
      <h2 className="text-2xl">Histórico da Ordem de Serviço</h2>
      {logs.length === 0 ? (
        <p className="text-center">Ainda não há registros.</p>
      ) : (
        <ul className="steps steps-vertical">
          {logs.map((log) => (
            <li key={log.id} className="step step-info h-1" data-content="">
              <p className="text-lg">
                <b>{dayjs(log.creationDate).format("DD/MM/YYYY hh:mm")}</b> - {log.action}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
