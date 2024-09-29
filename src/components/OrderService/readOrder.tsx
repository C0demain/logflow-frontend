'use client';
import { useState, useCallback, useEffect } from "react";
import { RequestItem } from "./requestItem";
import Loading from "@/app/loading";
import { listOs } from "@/app/api/orderService/listOrder";


interface ReadOrderProps {
  userId: string;
}

export const ReadOrder: React.FC<ReadOrderProps> = ({ userId }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getOs = useCallback(async () => {
    try {
      const response = await listOs();
      console.log(response)
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
      {data.map((order) => (
        <RequestItem
          key={order.id}
          status={order.status}
          orderId={order.id}
          name={order.title}
          sector={order.sector}
          userId={userId}
          clientName={order.client.clientName}
          userName={order.user.userName}
        />
      ))}
    </div>
  );
};
