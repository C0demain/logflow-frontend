import { createApiInstances } from "@/app/util/baseURL";
import axios from "axios";

export type TaskData = {
  id: string;
  title: string;
  sector: string;
  startedAt: Date | null;
  completedAt: Date | null;
  dueDate?: Date | null;
  stage: string;
  taskCost: number | null;
  serviceOrder?: {
    id: string,
    title: string
  };
  assignedUser?: {
    id: string,
    name: string,
    email: string
  };
  address?: {
    zipCode: string,
    state: string,
    city: string,
    neighborhood: string,
    street: string,
    number: string,
    complement?: string,
  }
  files?: Array<{
    id: string,
    filename: string,
  }>
};

type TasksResponse = {
  message: string;
  tasks: TaskData[];
  task: {};
};

export const getTasks = async (
  orderId: string | undefined,
  sector: string | undefined,
  userId: string | undefined,
  title: string | undefined,
  taskId: string | undefined
): Promise<TasksResponse> => {
  const { apiInstance } = await createApiInstances();
  try {
    if (!taskId) {
      let url = "/api/v1/task";
      const orderIdFilter = orderId ? "serviceOrderId=" + orderId : "";
      const sectorFilter = sector ? "sector=" + sector : "";
      const userIdFilter = userId ? "assignedUserId=" + userId : "";
      const titleFilter = title ? "title=" + title : "";

      const queryParams = [orderIdFilter, sectorFilter, userIdFilter, titleFilter]
        .filter((e) => e !== "")
        .join("&");
      url += queryParams ? "?" + queryParams : "";

      const response = await apiInstance.get(url);
      return response.data;
    } else {
      const response = await apiInstance.get(`/api/v1/task/${taskId}`)
      return response.data
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        "Erro ao listar tarefas: " + error.response?.data.message
      );
    } else {
      throw new Error("Erro ao listar tarefas: " + (error as Error).message);
    }
  }
};
