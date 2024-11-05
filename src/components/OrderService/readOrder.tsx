"use client";
import { listOs } from "@/app/api/orderService/listOrder";
import Loading from "@/components/Shared/loading";
import { useCallback, useEffect, useState } from "react";
import { RequestItem } from "./requestItem";
import Empty from "@/components/Shared/Empty";

interface ReadOrderProps {
  userId: string | undefined;
  autorizado: boolean
}

export const ReadOrder: React.FC<ReadOrderProps> = ({ userId, autorizado }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getOs = useCallback(async () => {
    try {
      const response = await listOs(null, null, null, true, null);
      setData(response);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getOs();
  }, [getOs]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      {data.length > 0 ?
        data.map((order) => (
          <RequestItem
            crudAutorizado={autorizado}
            key={order.id}
            status={order.status}
            orderId={order.id}
            name={order.title}
            sector={order.sector}
            userId={userId}
            clientName={order.client.clientName}
            price={order.value}
          />
        )) : <Empty title="Ainda não há ordens de serviço cadastrados" description="Crie uma nova ordem de serviço com o botao '+'" />
      }
    </div>
  );
};
