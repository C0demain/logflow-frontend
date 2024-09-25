import { createApiInstances } from "@/app/util/baseURL";
import axios from "axios";

// Function to list users
export const listUsers = async () => {
  const { apiLogin, apiInstance } = await createApiInstances();

  try {
    const response = await apiInstance.get('/api/v1/users');
    return response.data.users; // Adjust based on the actual response structure
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error('Erro ao listar usuários: ' + error.response?.data.message);
    } else {
      throw new Error('Erro ao listar usuários: ' + (error as Error).message);
    }
  }
};
