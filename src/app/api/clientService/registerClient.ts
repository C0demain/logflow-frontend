import { createApiInstances } from '@/app/util/baseURL';
import axios, { AxiosError } from 'axios';

interface UserData {
    name: string,
    phone: string,
    cnpj: string,
    email: string,
    zipCode: string,
    state: string,
    city: string,
    neighborhood: string,
    street: string,
    number: string,
    complement?: string
}

export const registerClient = async (userData: UserData) => {
  const { apiLogin, apiInstance } = await createApiInstances();

  try {
    const response = await apiInstance.post('/api/v1/client', userData);
    return response.data; // Adjust based on the actual response structure
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if(error?.response?.status === 400)
      throw new AxiosError(error.response.data?.message)
    } else {
      throw new AxiosError('Erro ao conectar ao servidor. Tente novamente');
    }
  }
};
