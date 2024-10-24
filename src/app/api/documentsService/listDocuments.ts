import { createApiInstances } from "@/app/util/baseURL";
import axios from "axios";

export const listDocuments = async (file: string, user:string | undefined) => {
  const { apiLogin, apiInstance } = await createApiInstances();

  try {
    let url = '/api/v1/files';
    
    const fileFilter = file ? `file=${file}` : "";
    const userFilter = user ? `userId=${user}` : "";

    const queryParams = [fileFilter, userFilter]
      .filter(param => param !== '')
      .join('&');

    if (queryParams) {
      url += `?${queryParams}`;
    }

    const response = await apiInstance.get(url);
    console.log(response)
    return response.data.files;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error('Erro ao listar arquivos: ' + error.response?.data.message);
    } else {
      throw new Error('Erro ao listar arquivos: ' + (error as Error).message);
    }
  }
};
