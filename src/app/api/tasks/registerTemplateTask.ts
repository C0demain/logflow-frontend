import { createApiInstances } from "@/app/util/baseURL";
import { TaskStage } from "@/enums/taskStage";
import axios from "axios";

export interface CreateTemplateTaskDto {
  title: string;
  processId: string;
  sector: "OPERACIONAL" | "FINANCEIRO" | "RH" | "DIRETORIA" | "VENDAS";
  stage: `${TaskStage}`;
  roleId: string;
}

export const registerTemplateTask = async (taskData: CreateTemplateTaskDto) => {
  const { apiInstance } = await createApiInstances();

  try {
    const response = await apiInstance.post("/api/v1/task/template", taskData);
    return response;
  } catch (error: unknown) {
    console.log(error)
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