import { createApiInstances } from "@/app/util/baseURL";

export const deleteVehicleById = async (id: string) => {
    const { apiInstance } = await createApiInstances();
    
    try {
        await apiInstance.delete(`/api/v1/vehicles/${id}`); 
    } catch (error) {
        throw new Error('Erro ao deletar veículo: ' + (error as Error).message);
    }
};
