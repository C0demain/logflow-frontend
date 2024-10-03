import { createApiInstances } from "@/app/util/baseURL"
import axios from "axios"

export const listOs = async() => {
  const { apiInstance } = await createApiInstances();
  
    try {
      const response = await apiInstance.get('/api/v1/service-order')
      return response.data.orders
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error('Erro ao listar ordem de serviço: ' + error.response?.data.message);
      } else {
        throw new Error('Erro ao listar ordem de serviço: ' + (error as Error).message);
      }
    }
}