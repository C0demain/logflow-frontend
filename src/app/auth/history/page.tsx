"use client";

import { useEffect, useState } from "react";

export default function OrderHistoryPage() {
  const [logs, setLogs] = useState<{ changedTo: string; atDate: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchLogs = async () => {
      const fetchedLogs = [
        { changedTo: "OPERACIONAL", atDate: "2024-10-16" },
        { changedTo: "FINANCEIRO", atDate: "2024-10-17" },
      ];
      setLogs(fetchedLogs);
      setLoading(false);
    };

    fetchLogs();
  }, []);

  return (
    <div className="m-5 space-y-5">
      <h1 className="text-2xl">Histórico da Ordem de Serviço:</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="col-span-4">
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
      )}
    </div>
  );
}
