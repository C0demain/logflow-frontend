import React from "react";
import { calculateAverage, calculateTotal, Order } from "@/app/api/dashboardService/orderUtils"; // Ajuste o caminho conforme necessário

interface AverageCostProps {
  orders: Order[];
}

const AverageCost: React.FC<AverageCostProps> = ({ orders }) => {
  const averageCost = calculateAverage(orders);
  const totalCost = calculateTotal(orders);

  return (
    <div className="flex justify-between mt-5">
      {/* Card para Custo Médio */}
      <div className="card bg-base-100 shadow-xl w-1/4 mr-4">
        <div className="card-body">
          <h2 className="card-title">Custo Médio</h2>
          <p className="text-2xl mt-2">R$ {averageCost.toFixed(2)}</p>
        </div>
      </div>

      {/* Card para Custo Total */}
      <div className="card bg-base-100 shadow-xl w-1/4 ml-4">
        <div className="card-body">
          <h2 className="card-title">Custo Total</h2>
          <p className="text-2xl mt-2">R$ {totalCost.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default AverageCost;
