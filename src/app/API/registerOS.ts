import axios from 'axios';

interface OrderData {
  title: string;
  clientRelated: string;
  status: string;
  userId: string;
}

export const registerOrder = async (orderData: OrderData) => {
  try {
    const response = await axios.post('http://localhost:8000/api/v1/service-order', orderData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error('Erro ao registrar ordem de serviço: ' + error.response?.data.message);
    } else {
      throw new Error('Erro ao registrar ordem de serviço: ' + (error as Error).message);
    }
  }
};
