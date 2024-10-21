import { createApiInstances } from "@/util/baseURL"
import axios from "axios"

export const ListClients = async(id: string, cnpj: string, email: string, name:string) => {
  const { apiInstance } = await createApiInstances();
  
    try {
        let url = '/api/v1/client'
        const idFilter = id ? 'startDate=' + id : "";
        const cnpjFilter = cnpj ? 'endDate=' + cnpj : "";
        const nameFilter = name ? 'endDate=' + name : "";
        const emailFilter = email ? 'endDate=' + email : "";
        const queryParams = [idFilter, cnpjFilter, nameFilter, emailFilter].filter(e => e !== '').join('&');
        url += queryParams ? "?" + queryParams : "";

        const response = await apiInstance.get(url)
        return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error('Erro ao listar tarefas: ' + error.response?.data.message);
      } else {
        throw new Error('Erro ao listar tarefas: ' + (error as Error).message);
      }
    }
}