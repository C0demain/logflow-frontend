import { createApiInstances } from '@/app/util/baseURL';
import axios from 'axios';

interface TaskData {
  title: string;
  orderId: string;
  userId: string;
  sector: 'OPERACIONAL' | 'FINANCEIRO' | 'COMERCIAL'
}

export const registerTask = async (taskData: TaskData) => {
  const { apiLogin, apiInstance } = await createApiInstances();

  try {
    const response = await apiInstance.post('/api/v1/task', taskData)
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error('Erro ao registrar nova tarefa: ' + error.response?.data.message);
    } else {
      throw new Error('Erro ao registrar nova tarefa: ' + (error as Error).message);
    }
  }
};
