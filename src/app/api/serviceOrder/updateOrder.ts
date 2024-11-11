import { createApiInstances } from "@/app/util/baseURL";
import { OrderData } from "@/interfaces/orderData";
import axios, { AxiosError } from "axios";

export const updateOrder = async (orderData: OrderData, id: string) => {
  const { apiInstance } = await createApiInstances();
  try {
    const response = await apiInstance.put(
      `/api/v1/service-order/${id}`,
      orderData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 400)
        throw new AxiosError(error.response.data?.message)
    } else {
      throw new AxiosError('Erro ao conectar ao servidor. Tente novamente');
    }
  }
};
