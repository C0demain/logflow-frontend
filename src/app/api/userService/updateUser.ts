import axios from 'axios';
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
      throw new Error('Erro ao atualizar funcionário: ' + error.response?.data.message);
    } else {
      throw new Error('Erro ao atualizar funcionário: ' + (error as Error).message);
    }
  }
};
