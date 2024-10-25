import { createApiInstances } from "@/app/util/baseURL";
import axios from "axios";

interface TaskData {
    title: string;
    completedAt: Date | null;
    userId: string;
    orderId: string;
    sector: string;
  }
export const updateTask = async(taskData: TaskData, id: string) => {
    const { apiLogin, apiInstance } = await createApiInstances();

    try {
        const response = await apiInstance.put(`/api/v1/task/${id}`, taskData)
        return response;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
        throw new Error('Erro ao registrar nova tarefa: ' + error.response?.data.message);
        } else {
        throw new Error('Erro ao registrar nova tarefa: ' + (error as Error).message);
        }
    }
}