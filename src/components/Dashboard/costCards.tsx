import React, { useEffect } from "react";
import { calculateAverage, calculateTotal, Order } from "@/app/api/dashboardService/orderUtils";

interface AverageCostProps {
  orders: Order[];
  onTotalCostCalculated?: (totalCost: number) => void;
}

const CostCards: React.FC<AverageCostProps> = ({ orders, onTotalCostCalculated }) => {
  // Calcula o custo médio e total usando as funções importadas
  const averageCost = calculateAverage(orders);
  const totalCost = calculateTotal(orders);

  // Envia o totalCost para o componente pai através do callback
  useEffect(() => {
    if (onTotalCostCalculated) {
      onTotalCostCalculated(totalCost);
    }
  }, [totalCost, onTotalCostCalculated]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
      {/* Card para Ticket Total */}
      <div className="card bg-base-100 shadow-xl w-full">
        <div className="card-body">
          <h2 className="card-title">Ticket Total</h2>
          <p className="text-2xl mt-2">R$ {totalCost.toFixed(2)}</p>
        </div>
      </div>
  
      {/* Card para Ticket Médio */}
      <div className="card bg-base-100 shadow-xl w-full">
        <div className="card-body">
          <h2 className="card-title">Ticket Médio</h2>
          <p className="text-2xl mt-2">R$ {averageCost.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default CostCards;
