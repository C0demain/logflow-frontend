import { createApiInstances } from '@/app/util/baseURL';
import axios from 'axios';

interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;  // Novo campo para o cargo
  sector: string;  // Novo campo para o setor
  isActive: boolean
}

export const registerUser = async (userData: UserData) => {
  const { apiLogin, apiInstance } = await createApiInstances();

  try {
    const response = await apiInstance.post('/api/v1/users', userData);
    return response.data; 
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error('Erro ao registrar funcionário: ' + error.response?.data.message);
    } else {
      throw new Error('Erro ao registrar funcionário: ' + (error as Error).message);
    }
  }
};
