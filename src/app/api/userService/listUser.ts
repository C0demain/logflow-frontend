import { createApiInstances } from "@/app/util/baseURL";
import axios from "axios";

export const listUsers = async () => {
  const { apiInstance } = await createApiInstances();

  try {
    const response = await apiInstance.get('/api/v1/users');
    return response.data.users; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error('Erro ao listar funcionários: ' + error.response?.data.message);
    } else {
      throw new Error('Erro ao listar funcionários: ' + (error as Error).message);
    }
  }
};
