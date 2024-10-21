import { createApiInstances } from "@/app/util/baseURL";
import axios from "axios";

export type TaskData = {
  id: string;
  title: string;
  completed: boolean;
  sector: string;
  assignedUser: {
    id: string;
    name: string;
    email: string;
  };
  serviceOrder: {
    id: string;
    title: string;
  };
};

type TasksResponse = {
  message: string;
  tasks: TaskData[];
};

export const getTasks = async (
  orderId: string,
  sector: string,
  userId: string,
  title: string
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
