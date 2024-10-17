import axios, { AxiosError } from "axios";
import { createApiInstances } from "@/app/util/baseURL";
import ClientUpdateInterface from "@/interfaces/clientUpdateInterface";

export const updateClientById = async (
  id: string,
  clientData: ClientUpdateInterface
) => {
  const { apiInstance } = await createApiInstances();

  try {
    const response = await apiInstance.put(`/api/v1/client/${id}`, clientData);
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
