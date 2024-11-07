import { createApiInstances } from "@/app/util/baseURL"
import { Process } from "@/interfaces/process";
import axios from "axios"

export const getSingleProcess = async (id: string): Promise<Process> => {
  const { apiLogin, apiInstance } = await createApiInstances();
  
    try {
        let url = `/api/v1/process/${id}`

        const response = await apiInstance.get(url)
        return response.data.process
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Erro ao obter processo com id ${id}: ` + error.response?.data.message);
      } else {
        throw new Error(`Erro ao obter processo com id ${id}: ` + (error as Error).message);
      }
    }
}