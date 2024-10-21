import { createApiInstances } from "@/app/util/baseURL";
import axios, { AxiosError } from "axios";

export const deleteOsById = async (id: string) => {
    const { apiInstance } = await createApiInstances();
    try {
        const response = await apiInstance.delete(`/api/v1/service-order/${id}`);
        console.log('Ordem de serviço deletada:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if(error?.response?.status === 400)
            throw new AxiosError(error.response.data?.message)
          } else {
            throw new AxiosError('Erro ao conectar ao servidor. Tente novamente');
          }
    }
};
