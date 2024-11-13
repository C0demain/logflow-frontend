import { createApiInstances } from "@/app/util/baseURL";
import axios, { AxiosError } from "axios";

interface OrderStats{
    totalValue: string
    averageValue: string
    totalTaskCost: string
    profit: string
}

interface Filters{
    dateFrom?: string | Date
    dateTo?: string | Date
}

export const getOrdersStats = async (filters?: Filters): Promise<OrderStats> => {
  
    const { apiInstance } = await createApiInstances();
  
    try {
     
      const response = await apiInstance.get("/api/v1/service-order/dashboard", { params: {
        dateFrom: filters?.dateFrom,
        dateTo: filters?.dateTo
      }});

      return response.data;
    } catch (error) {
      
      if (axios.isAxiosError(error)) {
        throw new AxiosError(error.response?.data?.message || "Erro ao carregar informações");
      } else {
        throw new AxiosError("Erro ao conectar ao servidor. Tente novamente.");
      }
    }
  };