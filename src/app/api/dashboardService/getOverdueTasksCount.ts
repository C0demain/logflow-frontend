import { createApiInstances } from "@/app/util/baseURL";
import axios, { AxiosError } from "axios";

export const getOverdueTasksCount = async (): Promise<number> => {
  
  const { apiInstance } = await createApiInstances();

  try {
   
    const response = await apiInstance.get("/api/v1/task/overdue/count");
    return response.data.count; 
  } catch (error) {
    
    if (axios.isAxiosError(error)) {
      throw new AxiosError(error.response?.data?.message || "Erro ao carregar tarefas atrasadas");
    } else {
      throw new AxiosError("Erro ao conectar ao servidor. Tente novamente.");
    }
  }
};
