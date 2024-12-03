import { createApiInstances } from "@/app/util/baseURL";
import axios from "axios";

interface Filters{
  sector?: string
  roleId?: string
}

export const listUsers = async (filters?: Filters) => {
  const { apiInstance } = await createApiInstances();

  if(filters?.sector === ''){
    filters.sector = undefined
  }

  if(filters?.roleId === ''){
    filters.roleId = undefined
  }

  try {
    const response = await apiInstance.get('/api/v1/users', { params: {
      sector: filters?.sector,
      roleId: filters?.roleId
    }});
    return response.data.users;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error('Erro ao listar funcionários: ' + error.response?.data.message);
    } else {
      throw new Error('Erro ao listar funcionários: ' + (error as Error).message);
    }
  }
};
