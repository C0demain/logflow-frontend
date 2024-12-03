import { createApiInstances } from "@/app/util/baseURL";
import axios, { AxiosError } from "axios";

interface MonthlyOrder {
  month: string;
  totalValue: number;
  averageValue: number,
  totalTaskCost: number,
  profit: number,
  completedTasks: number,
  completedOrders: number
}

export const getMonthlyOrders = async (
  dateFrom: string | Date,
  dateTo: string | Date
): Promise<MonthlyOrder[]> => {
  const { apiInstance } = await createApiInstances();

  try {
    const response = await apiInstance.get('/api/v1/service-order/dashboard/monthly', {
      params: {
        dateFrom,
        dateTo,
      },
    });

    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro de Axios:', error.response?.data || error.message);
    } else {
      console.error('Erro desconhecido:', error);
    }
    throw error;
  }
};
