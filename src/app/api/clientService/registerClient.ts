import { createApiInstances } from '@/app/util/baseURL';
import axios, { AxiosError } from 'axios';

interface ClientData {
  name: string,
  phone: string,
  cnpj: string,
  email: string,
  address: {
    zipCode: string,
    state: string,
    city: string,
    neighborhood: string,
    street: string,
    number: string,
    complement?: string
  }
}

export const registerClient = async (clientData: ClientData) => {
  const { apiInstance } = await createApiInstances();

  try {
    const response = await apiInstance.post('/api/v1/client', clientData);
    return response.data; 
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 400)
        throw new AxiosError(error.response.data?.message)
    } else {
      throw new AxiosError('Erro ao conectar ao servidor. Tente novamente');
    }
  }
};
