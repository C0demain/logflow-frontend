import { createApiInstances } from "@/app/util/baseURL";

export const deleteClientById = async (id: string) => {
    const { apiInstance } = await createApiInstances();
    
    try {
        await apiInstance.delete(`/api/v1/client/${id}`);
    } catch (error) {
        throw new Error('Erro ao deletar cliente: ' + (error as Error).message);
    }
};
