import { createApiInstances } from "@/app/util/baseURL";
import axios from "axios";

// Function to delete a user by ID
export const deleteUserById = async (id: string) => {
    const { apiLogin, apiInstance } = await createApiInstances();
    try {
        const response = await apiInstance.delete(`/api/v1/client/${id}`);
        console.log('Cliente deletado:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error('Erro ao deletar cliente: ' + error.response?.data.message);
        } else {
            throw new Error('Erro ao deletar cliente: ' + (error as Error).message);
        }
    }
};
