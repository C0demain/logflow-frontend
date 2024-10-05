import React, { useCallback, useEffect, useState } from "react";
import { RequestItem } from "./requestItem";
import Loading from "@/app/loading";
import { listServiceOrders } from "@/app/api/orderService/listOrder";
import { CreateOrder } from "./createOrder";
import { Alert, AlertIcon } from "@chakra-ui/react";
interface Order {
  id: string;
  status: string;
  title: string;
  sector: string;
  client: { clientName: string };
}

interface ReadOrderProps {
  userId: string;
}

interface SimplifiedOrder {
  id: string;
  title: string;
  status: string;
  sector: string;
  client: { clientName: string };
}

export const ReadOrder: React.FC<ReadOrderProps> = ({ userId }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const getServiceOrders = useCallback(async () => {
    try {
      const response = await listServiceOrders();
      setOrders(response);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getServiceOrders();
  }, [getServiceOrders]);

  if (loading) {
    return <Loading />;
  }

  const handleDeleteOrder = (id: string) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  // Função para adicionar nova ordem ao estado local
  const handleAddOrder = (newOrder: SimplifiedOrder) => {
    const completeOrder: Order = {
      ...newOrder,
    };
    setOrders((prevOrders) => [...prevOrders, completeOrder]);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <CreateOrder id={userId} onAddOrder={handleAddOrder} />

       {/* Alerta caso não haja ordens de serviço */}
       {orders.length === 0 && (
        <Alert status="info" width="full" borderRadius="md" variant="subtle">
          <AlertIcon />
          Nenhuma ordem de serviço cadastrada.
        </Alert>
      )}
      
      {orders.map((order, id) => (
        <RequestItem
          key={id}
          name={order.title}
          status={order.status}
          orderId={order.id}
          sector={order.sector}
          userId={userId}
          clientName={order.client.clientName}
          onDelete={handleDeleteOrder}
        />
      ))}
    </div>
  );
};
