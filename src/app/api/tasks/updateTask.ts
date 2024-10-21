import { createApiInstances } from "@/util/baseURL";
import axios from "axios";

interface TaskData {
    title: string;
    completed: boolean;
    userId: string;
    orderId: string;
    sector: string;
  }
export const UpdateTask = async(taskData: TaskData, id: string) => {
    const { apiInstance } = await createApiInstances();

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