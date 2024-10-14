import { createApiInstances } from "@/app/util/baseURL";
import axios from "axios";

export const deleteUserById = async (id: string) => {
  const { apiInstance } = await createApiInstances();

  try {
    const response = await apiInstance.delete(`/api/v1/users/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Erro ao deletar usuário: ' + error.message);
    } else {
      throw new Error('Erro desconhecido ao deletar usuário');
    }
  }
};
