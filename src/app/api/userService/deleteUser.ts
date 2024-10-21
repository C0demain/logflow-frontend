import { createApiInstances } from "@/util/baseURL";
import axios, { AxiosError } from "axios";

export const deleteUserById = async (id: string) => {
  const { apiInstance } = await createApiInstances();

  try {
    const response = await apiInstance.delete(`/api/v1/users/${id}`);
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
