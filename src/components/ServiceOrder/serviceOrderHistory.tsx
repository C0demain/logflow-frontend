import React from "react";

interface Log {
  changedTo: string;
  atDate: string;
}

interface OrderHistoryProps {
  logs: Log[];
}

const ServiceOrderHistory: React.FC<OrderHistoryProps> = ({ logs }) => {
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-center mb-4">Histórico da Ordem de Serviço</h2>
      {logs.length === 0 ? (
        <p className="text-center">Nenhum histórico encontrado.</p>
      ) : (
        <ul className="steps steps-vertical">
          {logs.map((log, index) => (
            <li key={index} className="step step-info">
              {log.atDate} - Ordem movida para {log.changedTo}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServiceOrderHistory;
