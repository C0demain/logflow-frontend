import React, { useState, useEffect } from "react";
import { listOs } from "@/app/api/orderService/listOrder"; // Ajuste o caminho se necessário
import { Order } from "@/app/api/dashboardService/orderUtils"; // Ajuste o caminho se necessário

// Função para contar a quantidade de ordens de serviço atrasadas
const qtdOverdueOrders = (orders: Order[]): number => {
  return orders.filter(order => {
    // Verifica se a tarefa está atrasada (com base na lógica de datas)
    const now = new Date();
    return new Date(order.dueDate) < now; // Atrasadas se a data de término for no passado
  }).length;
};

const OverdueOrdersCount: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar as ordens de serviço
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await listOs(null, null, null, true, null); // Ajuste os parâmetros conforme necessário
      setOrders(response);
    } catch (err) {
      setError("Erro ao carregar as ordens de serviço.");
    } finally {
      setLoading(false);
    }
  };

  // Carregar as ordens ao montar o componente
  useEffect(() => {
    fetchOrders();
  }, []);

  // Exibe "Carregando..." enquanto as ordens não forem carregadas
  if (loading) return <div>Carregando...</div>;

  // Exibe uma mensagem de erro se houver algum problema ao carregar as ordens
  if (error) return <div>{error}</div>;

  // Calcula a quantidade de ordens atrasadas com a função qtdOverdueOrders
  const totalOverdueOrders = qtdOverdueOrders(orders);

  return (
    <div className="card bg-base-100 shadow-xl w-full my-4">
      <div className="card-body">
        <h2 className="card-title">Ordens de Serviço Atrasadas</h2>
        <p className="text-2xl mt-2">{totalOverdueOrders} Ordens Atrasadas</p>
      </div>
    </div>
  );
};

export default OverdueOrdersCount;
