import { createApiInstances } from "@/app/util/baseURL"
import axios, { AxiosError } from "axios"

export const listOs = async(id: string | null, title: string | null, status: string | null, active: boolean | null, clientRelated: string | null) => {
  const { apiLogin, apiInstance } = await createApiInstances();
  
    try {
      let url = '/api/v1/service-order'
      const orderIdFilter = id ? "id=" + id : "";
      const statusFilter = status ? "status=" + status : "";
      const clienteRelatedFilter = clientRelated ? "clientRelated=" + clientRelated : "";
      const titleFilter = title ? "title=" + title : "";
      const activeFilter = active ? "active=" + active : "";

      const queryParams = [orderIdFilter, statusFilter, clienteRelatedFilter, titleFilter, activeFilter]
        .filter((e) => e !== "")
        .join("&");
      url += queryParams ? "?" + queryParams : "";

      const response = await apiInstance.get(url);
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