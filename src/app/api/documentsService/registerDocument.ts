import { createApiInstances } from '@/app/util/baseURL';
import axios, { AxiosError } from 'axios';

interface DocumentData {
  filename: string
  file: File;
  userId: string | undefined,
  taskId: string | undefined;
}

export const registerDocument = async (documentData: DocumentData) => {
  const { apiLogin, apiInstance } = await createApiInstances();

  const formData = new FormData();
  formData.append('file', documentData.file);
  if (documentData.userId) { formData.append('userId', documentData.userId) }
  if (documentData.taskId) { formData.append('taskId', documentData.taskId) }

  try {
    const response = await apiInstance.post('/api/v1/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 400) {
        throw new AxiosError(error.response.data?.message);
      }
    } else {
      throw new AxiosError('Erro ao conectar ao servidor. Tente novamente');
    }
  }
};