import React from "react";
import { calculateProfit } from "@/app/api/dashboardService/orderUtils"; // Importe a função calculateProfit
import { Order } from "@/app/api/dashboardService/orderUtils"; // Importando o tipo Order

interface ProfitCalculatorProps {
  orders: Order[];       // Adicionando orders como parâmetro
  totalTaskCost: number; // Mantendo totalTaskCost
}

const ProfitCalculator: React.FC<ProfitCalculatorProps> = ({ orders, totalTaskCost }) => {
  // Usar a função calculateProfit para calcular o lucro
  const profit = calculateProfit(orders, totalTaskCost);

  // Verificar no console os valores recebidos (útil para debug)
  console.log("Lucro Total Calculado:", profit);

  return (
    <div className="card bg-base-100 shadow-xl w-1/4">
      <div className="card-body">
        <h2 className="card-title">Lucro Total</h2>
        <p className="text-2xl mt-2">
          R$ {profit.toFixed(2)} {/* Exibindo o lucro formatado */}
        </p>
      </div>
    </div>
  );
};

export default ProfitCalculator;
