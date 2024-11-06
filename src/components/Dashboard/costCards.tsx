import React from "react";
import { calculateAverage, calculateTotal, Order } from "@/app/api/dashboardService/orderUtils"; // Ajuste o caminho conforme necessário

interface AverageCostProps {
  orders: Order[];
}

const CostCards: React.FC<AverageCostProps> = ({ orders }) => {
  const calculateAverage = (orders: Order[]): number => {
    if (!Array.isArray(orders) || orders.length === 0) return 0;
    const totalValue = orders.reduce((acc, order) => {
      const orderValue = typeof order.value === "number" ? order.value : parseFloat(order.value);
      return acc + (isNaN(orderValue) ? 0 : orderValue);
    }, 0);
    return totalValue / orders.length;
  };

  const calculateTotal = (orders: Order[]): number => {
    if (!Array.isArray(orders)) return 0;
    return orders.reduce((acc, order) => {
      const orderValue = typeof order.value === "number" ? order.value : parseFloat(order.value);
      return acc + (isNaN(orderValue) ? 0 : orderValue);
    }, 0);
  };

  const averageCost = calculateAverage(orders);
  const totalCost = calculateTotal(orders);

  console.log("Custo Médio:", averageCost.toFixed(2)); // Log da média
  console.log("Custo Total:", totalCost.toFixed(2)); // Log do total

  return (
    <div className="flex justify-between mt-5">
      {/* Card para Custo Médio */}
      <div className="card bg-base-100 shadow-xl w-1/2 mr-2">
        <div className="card-body">
          <h2 className="card-title">Custo Médio</h2>
          <p className="text-2xl mt-2">R$ {averageCost.toFixed(2)}</p>
        </div>
      </div>

      {/* Card para Custo Total */}
      <div className="card bg-base-100 shadow-xl w-1/2 ml-2">
        <div className="card-body">
          <h2 className="card-title">Custo Total</h2>
          <p className="text-2xl mt-2">R$ {totalCost.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default CostCards;
