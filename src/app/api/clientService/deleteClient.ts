import { createApiInstances } from "@/app/util/baseURL";
import axios from "axios";

// Function to delete a user by ID
export const deleteUserById = async (id: string) => {
    const { apiLogin, apiInstance } = await createApiInstances();
    try {
        const response = await apiInstance.delete(`/api/v1/users/${id}`);
        console.log('Usuário deletado:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error('Erro ao deletar usuário: ' + error.response?.data.message);
        } else {
            throw new Error('Erro ao deletar usuário: ' + (error as Error).message);
        }
    }
};
