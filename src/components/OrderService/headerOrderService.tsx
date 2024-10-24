import { listOs } from "@/app/api/orderService/listOrder";
import Loading from "@/app/loading";
import { useState, useCallback, useEffect } from "react";

// Defina a interface para o objeto OrderService
interface OrderService {
    id: number;
    title: string;
    client: string;
    status: string;
    sector: string;
    user: string;
    logs: any[]; // ou um tipo mais específico se você souber
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
        console.log(response);
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
      <div className="my-2 space-y-3 bg-white shadow-lg rounded-md p-6">
        <div className="flex items-center space-x-6 justify-between">
          <div className="mr-8">
            <h1 className="text-2xl font-bold">{orderService?.title}</h1>
          </div>
          <div className="flex justify-evenly w-3/4">
          <div>
            <h1 className="text-2xl font-bold mr-3">Preço:</h1>
            <h1 className="text-2xl bg-slate-200 p-1 rounded-md">R${orderService?.value}</h1>
          </div>
          <div>
            <h1 className="text-2xl font-bold mr-3">Descrição:</h1>
            <p className="text-2xl bg-slate-200 p-1 rounded-md">{orderService?.description}</p>
          </div>
          </div>
        </div>
      </div>
    );
  };
  