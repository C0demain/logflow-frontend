import { createApiInstances } from "@/app/util/baseURL";
import axios from "axios";

export const listRoles = async () => {
  const { apiInstance } = await createApiInstances();

  try {
    const response = await apiInstance.get('/api/v1/roles');
    return response.data;
  } catch (error) {
    console.log(error)
    if (axios.isAxiosError(error)) {
      throw new Error('Erro ao listar roles: ' + error.response?.data.message);
    } else {
      throw new Error('Erro ao listar roles: ' + (error as Error).message);
    }
  }
};
