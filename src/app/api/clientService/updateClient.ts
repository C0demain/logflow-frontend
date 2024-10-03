import axios from "axios";
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
      throw new Error(
        "Erro ao atualizar cliente: " + error.response?.data.message
      );
    } else {
      throw new Error("Erro ao atualizar cliente: " + (error as Error).message);
    }
  }
};
