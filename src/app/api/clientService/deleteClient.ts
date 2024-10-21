import { createApiInstances } from "@/util/baseURL";

export const DeleteClientById = async (id: string) => {
    const { apiInstance } = await createApiInstances();
    
    try {
        await apiInstance.delete(`/api/v1/client/${id}`);
    } catch (error) {
        throw new Error('Erro ao deletar cliente: ' + (error as Error).message);
    }
};
