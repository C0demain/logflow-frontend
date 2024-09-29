import { createApiInstances } from "@/app/util/baseURL";
import axios from "axios";

export const deleteOsById = async (id: string) => {
    const { apiLogin, apiInstance } = await createApiInstances();
    try {
        const response = await apiInstance.delete(`/api/v1/service-order/${id}`);
        console.log('Ordem de serviço deletada:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error('Erro ao deletar ordem de serviço: ' + error.response?.data.message);
        } else {
            throw new Error('Erro ao deletar ordem de serviço: ' + (error as Error).message);
        }
    }
};
