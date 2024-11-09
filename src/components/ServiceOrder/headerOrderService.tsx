import { listOs } from "@/app/api/serviceOrder/listOrder";
import Loading from "@/app/loading";
import { useState, useCallback, useEffect } from "react";

interface OrderService {
  id: number;
  title: string;
  client: string;
  status: string;
  sector: string;
  user: string;
  logs: any[];
  description: string;
  value: number;
}

interface HeaderOrderServiceProps {
  orderId: string;
}

// No seu componente
export const HeaderOrderService: React.FC<HeaderOrderServiceProps> = ({ orderId }) => {
  const [orderService, setOrderService] = useState<OrderService | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const getOs = useCallback(async () => {
    try {
      const response = await listOs(orderId, null, null, true, null);
      setOrderService(response[0]); // Supondo que response é um array e você quer o primeiro item
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, [orderId]); // Não esqueça de incluir orderId nas dependências

  useEffect(() => {
    getOs();
  }, [getOs]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mb-2 bg-white shadow-lg rounded-md p-2 md:p-2">
      <div className="flex flex-col md:flex-row items-start md:items-center md:space-y-0 md:space-x-6 justify-between">
        <div className="w-full md:w-auto">
          <h1 className="text-lg md:text-2xl font-bold">{orderService?.title}</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-between w-full md:w-3/4 space-y-4 md:space-y-0 md:space-x-6">
          <div>
            <h1 className="text-lg md:text-2xl font-bold mr-3">Preço:</h1>
            <h1 className="text-lg md:text-2xl bg-slate-200 p-1 rounded-md">R${orderService?.value}</h1>
          </div>
          <div className="w-2/3">
            <h1 className="text-lg md:text-2xl font-bold mr-3">Descrição:</h1>
            <p className="text-lg md:text-2xl bg-slate-200 p-1 rounded-md w-full">{orderService?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
