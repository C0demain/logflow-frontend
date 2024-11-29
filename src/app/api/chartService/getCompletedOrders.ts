import { createApiInstances } from "@/app/util/baseURL";
import axios from "axios";

interface CompletedOrdersData {
  month: string;
  completedOrders: number;
}

export const getCompletedOrders = async (
  dateFrom: string | Date,
  dateTo: string | Date
): Promise<CompletedOrdersData[]> => {
  const { apiInstance } = await createApiInstances();

  try {
    const response = await apiInstance.get("/api/v1/service-order/dashboard/monthly", {
      params: {
        dateFrom,
        dateTo,
      },
    });

    return response.data.map((item: any) => ({
      month: item.month,
      completedOrders: item.completedOrders,
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro de Axios:", error.response?.data || error.message);
    } else {
      console.error("Erro desconhecido:", error);
    }
    throw error;
  }
};
