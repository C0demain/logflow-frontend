import { createApiInstances } from '@/app/util/baseURL';
import axios, { AxiosError } from 'axios';

interface OrderData {
  clientId: string;
  status: string;
  userId: string
  sector: string;
  processId: string
  description: string | undefined;
  value: number | undefined;
}

export const registerOrder = async (orderData: OrderData) => {
  const { apiInstance } = await createApiInstances();
  try {
    const response = await apiInstance.post("/api/v1/service-order", orderData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if(error?.response?.status === 400)
      throw new AxiosError(error.response.data?.message)
    } else {
      throw new AxiosError('Erro ao conectar ao servidor. Tente novamente');
    }
  }
};
