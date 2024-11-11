import { createApiInstances } from "@/app/util/baseURL";
import axios from "axios";

export const listDocuments = async (file: string, user: string | undefined, taskId: string | undefined) => {
  const { apiInstance } = await createApiInstances();

  try {
    let url = '/api/v1/files';

    const fileFilter = file ? `file=${file}` : "";
    const userFilter = user ? `userId=${user}` : "";
    const taskFilter = taskId ? `taskId=${taskId}` : "";

    const queryParams = [fileFilter, userFilter, taskFilter]
      .filter(param => param !== '')
      .join('&');

    if (queryParams) {
      url += `?${queryParams}`;
    }

    const response = await apiInstance.get(url);
    return response.data.files;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error('Erro ao listar arquivos: ' + error.response?.data.message);
    } else {
      throw new Error('Erro ao listar arquivos: ' + (error as Error).message);
    }
  }
};
