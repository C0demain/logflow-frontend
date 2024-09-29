import { createApiInstances } from "@/app/util/baseURL"
import axios from "axios"

export const getTasks = async(orderId: string, userId: string, title:string) => {
  const { apiLogin, apiInstance } = await createApiInstances();
  console.log(orderId, userId, title)

    try {
        let url = '/api/v1/task'
        const orderIdFilter = orderId ? 'serviceOrderId=' + orderId : "";
        const userIdFilter = userId ? 'assignedUserId=' + userId : "";
        const titleFilter = title ? 'title=' + title : "";

        const queryParams = [orderIdFilter, userIdFilter, titleFilter].filter(e => e !== '').join('&');
        url += queryParams ? "?" + queryParams : "";

        console.log(url)
        const response = await apiInstance.get(url)
        return response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error('Erro ao listar tarefas: ' + error.response?.data.message);
      } else {
        throw new Error('Erro ao listar tarefas: ' + (error as Error).message);
      }
    }
}