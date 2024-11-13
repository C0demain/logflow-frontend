import { createApiInstances } from "@/app/util/baseURL"
import axios, { AxiosError } from "axios"

export const listOs = async (id: string | null, title: string | null, status: string | null, active: boolean | null, clientRelated: string | null, createdFrom?: string | Date, createdTo?: string | Date) => {
  const { apiInstance } = await createApiInstances();

  try {
    const url = '/api/v1/service-order'

    const response = await apiInstance.get(url, {params: {
      id,
      status,
      clientRelated,
      title,
      active,
      createdFrom,
      createdTo
    } });

    return response.data.orders
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 400)
        throw new AxiosError(error.response.data?.message)
    } else {
      throw new AxiosError('Erro ao conectar ao servidor. Tente novamente');
    }
  }
}