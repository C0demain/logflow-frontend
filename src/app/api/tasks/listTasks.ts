import { createApiInstances } from "@/app/util/baseURL";
import { Task } from "@/interfaces/task";
import axios from "axios";

type TasksResponse = {
  message: string;
  tasks: Task[];
};

export const getTasks = async (
  orderId: string | undefined,
  sector: string | undefined,
  userId: string | undefined,
  title: string | undefined,
): Promise<TasksResponse> => {
  const { apiInstance } = await createApiInstances();
  try {
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
