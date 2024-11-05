import { createApiInstances } from '@/app/util/baseURL';
import axios, { AxiosError } from 'axios';

interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
  sector: string;
  isActive: boolean
}

export const registerUser = async (userData: UserData) => {
  const { apiInstance } = await createApiInstances();

  try {
    const response = await apiInstance.post('/api/v1/users', userData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 400 || error?.response?.status === 404)
        throw new AxiosError(error.response.data?.message)
    } else {
      throw new AxiosError('Erro ao conectar ao servidor. Tente novamente');
    }
  }
};
