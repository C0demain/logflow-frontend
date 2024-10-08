import { createApiInstances } from "@/app/util/baseURL";
import { OrderData } from "@/interfaces/orderData";
import axios from "axios";

export const updateOrder = async (orderData: OrderData, id: string) => {
  const { apiLogin, apiInstance } = await createApiInstances();
  try {
    const response = await apiInstance.put(
      `/api/v1/service-order/${id}`,
      orderData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        "Erro ao atualizar ordem de serviço: " + error.response?.data.message
      );
    } else {
      throw new Error(
        "Erro ao atualizar ordem de serviço: " + (error as Error).message
      );
    }
  }
};
