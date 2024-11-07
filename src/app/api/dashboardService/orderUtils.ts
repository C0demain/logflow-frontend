export interface Order {
  id: string;
  title: string;
  value: number;
}

export const calculateAverage = (orders: Order[]): number => {
  if (!Array.isArray(orders) || orders.length === 0) return 0;
  const totalValue = orders.reduce((acc, order) => acc + (typeof order.value === "number" ? order.value : parseFloat(order.value)), 0);
  return totalValue / orders.length;
};

export const calculateTotal = (orders: Order[]): number => {
  if (!Array.isArray(orders)) return 0;
  return orders.reduce((acc, order) => acc + (typeof order.value === "number" ? order.value : parseFloat(order.value)), 0);
};

// Função para calcular o lucro
export const calculateProfit = (orders: Order[], totalTaskCost: number): number => {
  const totalRevenue = calculateTotal(orders);  // Cálculo do total de receita (valor das ordens)
  const profit = totalRevenue - totalTaskCost;  // Subtrai o custo das tarefas do total de receita
  return profit;
};

// Exporta o custo total das ordens
export const totalCost = (orders: Order[]): number => calculateTotal(orders);
