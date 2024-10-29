import { createApiInstances } from "@/app/util/baseURL";
import axios from "axios";

export const uncompleteTask = async (id: string) => {
  const { apiLogin, apiInstance } = await createApiInstances();

  try {
    const response = await apiInstance.patch(`/api/v1/task/${id}/uncomplete`);
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        "Erro ao desmarcar tarefa como concluída: " + error.response?.data.message
      );
    } else {
      throw new Error(
        "Erro ao desmarcar tarefa como concluída: " + (error as Error).message
      );
    }
  }
};
