import { createApiInstances } from "@/app/util/baseURL";
import { Task } from "@/interfaces/task";
import axios from "axios";

export default async function getSingleTask(taskId: string): Promise<Task>{
    const { apiInstance } = await createApiInstances();
    try {
        let url = `/api/v1/task/${taskId}`
        const response = await apiInstance.get(url);
        return response.data.task;
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
        throw new Error(
            "Erro ao listar tarefas: " + error.response?.data.message
        );
        } else {
        throw new Error("Erro ao listar tarefas: " + (error as Error).message);
        }
    }
}