import { createApiInstances } from "@/app/util/baseURL"
import { Process } from "@/interfaces/process";
import axios from "axios"

type ProcessData = Partial<Process>
export const registerProcess = async (processData: ProcessData) => {
  const { apiInstance } = await createApiInstances();

  try {
    const url = '/api/v1/process'

    const response = await apiInstance.post(url, processData)
    return response
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error('Erro ao obter processos: ' + error.response?.data.message);
    } else {
      throw new Error('Erro ao obter processos: ' + (error as Error).message);
    }
  }
}