// orderUtils.ts
export interface Order {
    id: string;
    title: string;
    value: number;
  }
  
  export const calculateAverage = (orders: Order[]): number => {
    if (!Array.isArray(orders) || orders.length === 0) return 0; // Verifica se orders é um array
    const totalValue = orders.reduce((acc, order) => acc + (typeof order.value === "number" ? order.value : parseFloat(order.value)), 0);
    return totalValue / orders.length; // Retorna a média
  };
  
  export const calculateTotal = (orders: Order[]): number => {
    if (!Array.isArray(orders)) return 0; // Verifica se orders é um array
    return orders.reduce((acc, order) => acc + (typeof order.value === "number" ? order.value : parseFloat(order.value)), 0); // Retorna o total
  };
  