import { createApiInstances } from '@/app/util/baseURL';
import axios from 'axios';

interface UserData {
  name: string;
  email: string;
  phone: string;
  // Add other fields as necessary
}

export const registerUser = async (userData: UserData) => {
  const { apiLogin, apiInstance } = await createApiInstances();

  try {
    const response = await apiInstance.post('/api/v1/users', userData);
    return response.data; // Adjust based on the actual response structure
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error('Erro ao registrar usuário: ' + error.response?.data.message);
    } else {
      throw new Error('Erro ao registrar usuário: ' + (error as Error).message);
    }
  }
};
