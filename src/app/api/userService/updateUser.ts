import axios, { AxiosError } from 'axios';
import { createApiInstances } from '@/app/util/baseURL'; // Certifique-se de que o caminho está correto

interface UserData {
  name: string;
  email: string;
  role: string;
  sector: string;
}

export const updateUserById = async (id: string, userData: UserData) => {
  const { apiInstance } = await createApiInstances();

  try {
    const response = await apiInstance.put(`/api/v1/users/${id}`, userData); // A API de atualização
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
