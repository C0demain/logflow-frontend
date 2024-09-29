// src/app/api/clientService/deleteClient.ts
import axios from "axios";
import { createApiInstances } from "@/app/util/baseURL";

export const deleteClientById = async (id: string) => {
    const { apiInstance } = await createApiInstances();
    
    try {
        await apiInstance.delete(`/api/v1/client/${id}`); // Altere o endpoint conforme necessário
    } catch (error) {
        throw new Error('Erro ao deletar cliente: ' + (error as Error).message);
    }
};
