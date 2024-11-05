import React from "react";

export interface Order {
  id: string;
  title: string;
  value: number;
}

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

  return (
    <div className="w-full max-w-md mx-auto mt-5">
      <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Custo Médio</h2>
                <p className="text-2xl mt-2">R$ {averageCost.toFixed(2)}</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
          <br></br>
      <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Custo Total</h2>
                <p className="text-2xl mt-2">R$ {totalCost.toFixed(2)}</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
    </div>
  );
};

export default CostCards;
