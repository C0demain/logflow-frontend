import React, { useState, useEffect, useContext } from "react";
import { Order } from "@/app/api/dashboardService/orderUtils";
import { listOs } from "@/app/api/serviceOrder/listOrder";
import Loading from "@/app/loading";
import { DateFilterContext } from "@/app/context/dashboard";

// Função para contar a quantidade de ordens abertas (não finalizadas)
const qtdOrders = (orders: Order[]): number => {
  // Filtra as ordens abertas, excluindo as que têm status "FINALIZADO"
  return orders.filter(order => order.status !== "FINALIZADO").length;
};

const OrderCount: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const {startDate, endDate} = useContext(DateFilterContext)

  // Função para buscar as ordens
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await listOs(null, null, null, true, null, startDate, endDate); // Ajuste os parâmetros se necessário
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
  }, [startDate, endDate]);

  // Exibe uma mensagem de erro se houver algum problema ao carregar as ordens
  if (error) return <div>{error}</div>;

  // Calcula a quantidade de ordens abertas com a função qtdOrders
  const totalOrders = qtdOrders(orders);

  return (
    <div className="card bg-base-100 shadow-xl w-full my-4">
      <div className="card-body">
        <h2 className="card-title">Quantidade de Ordens de Serviço em Aberto</h2>
        {loading ? <Loading/> : <p className="text-2xl mt-2">{totalOrders}</p>}
      </div>
    </div>
  );
};

export default OrderCount;
