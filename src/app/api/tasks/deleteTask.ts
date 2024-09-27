import { createApiInstances } from "@/app/util/baseURL";
import axios from "axios";

export const deleteTaskById = async (id: string) => {
    const { apiLogin, apiInstance } = await createApiInstances();
    try {
        const response = await apiInstance.delete(`/api/v1/task/${id}`);
        console.log('Tarefa deletada:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error('Erro ao deletar tarefa: ' + error.response?.data.message);
        } else {
            throw new Error('Erro ao deletar tarefa: ' + (error as Error).message);
        }
    }
};
