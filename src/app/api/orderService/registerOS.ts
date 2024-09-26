import { createApiInstances } from '@/app/util/baseURL';
import axios from 'axios';

interface OrderData {
  title: string;
  clientId: string;
  status: string;
  userId: string;
  sector: string;
}

export const registerOrder = async (orderData: OrderData) => {
  const { apiLogin, apiInstance } = await createApiInstances();

  try {
    const response = await apiInstance.post('/api/v1/service-order', orderData)
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error('Erro ao registrar ordem de serviço: ' + error.response?.data.message);
    } else {
      throw new Error('Erro ao registrar ordem de serviço: ' + (error as Error).message);
    }
  }
};
