import { createApiInstances } from "@/app/util/baseURL";
import axios, { AxiosError } from "axios";

interface Filters{
  startedAt?: string | Date,
  dueDate?: string | Date
}

export const getOverdueTasksCount = async (filters?: Filters): Promise<number> => {
  
  const { apiInstance } = await createApiInstances();
  if(filters?.startedAt === ""){
    filters.startedAt = undefined
  }

  if(filters?.dueDate === ""){
    filters.dueDate = undefined
  }

  try {
   
    const response = await apiInstance.get("/api/v1/task/overdue/count", {params:{
      startedAt: filters?.startedAt,
      dueDate: filters?.dueDate
    }});
    console.log(response)

    return response.data.count; 
  } catch (error) {
    console.log(error)
    if (axios.isAxiosError(error)) {
      throw new AxiosError(error.response?.data?.message || "Erro ao carregar tarefas atrasadas");
    } else {
      throw new AxiosError("Erro ao conectar ao servidor. Tente novamente.");
    }
  }
};
