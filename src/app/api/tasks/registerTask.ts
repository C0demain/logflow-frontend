import { createApiInstances } from "@/util/baseURL";
import axios from "axios";

interface TaskData {
  title: string;
  orderId: string;
  userId: string;
  sector: "OPERACIONAL" | "FINANCEIRO" | "RH" | "DIRETORIA" | "VENDAS";
  completed: boolean;
}

export const RegisterTask = async (taskData: TaskData) => {
  const { apiInstance } = await createApiInstances();

  try {
    const response = await apiInstance.post("/api/v1/task", taskData);
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        "Erro ao registrar nova tarefa: " + error.response?.data.message
      );
    } else {
      throw new Error(
        "Erro ao registrar nova tarefa: " + (error as Error).message
      );
    }
  }
};
