import { createApiInstances } from "@/app/util/baseURL"
import axios from "axios"

export const deleteProcess = async (id: string) => {
  const { apiInstance } = await createApiInstances();
  
    try {
        const url = `/api/v1/process/${id}`

        const response = await apiInstance.delete(url)
        return response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Erro ao obter processo com id ${id}: ` + error.response?.data.message);
      } else {
        throw new Error(`Erro ao obter processo com id ${id}: ` + (error as Error).message);
      }
    }
}