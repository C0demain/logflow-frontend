import { createApiInstances } from "@/app/util/baseURL"
import axios, { AxiosError } from "axios"

export const listOs = async() => {
  const { apiInstance } = await createApiInstances();
  
    try {
      const response = await apiInstance.get('/api/v1/service-order')
      return response.data.orders
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if(error?.response?.status === 400)
        throw new AxiosError(error.response.data?.message)
      } else {
        throw new AxiosError('Erro ao conectar ao servidor. Tente novamente');
      }
    }
}