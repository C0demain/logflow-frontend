import axios from "axios";

export const deleteOsById = async (id: string) => {
    try {
        const response = await axios.delete(`http://localhost:8000/api/v1/service-order/${id}`);
        console.log('Ordem de serviço deletada:', response.data);
        console.log("foi")
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error('Erro ao deletar ordem de serviço: ' + error.response?.data.message);
        } else {
            throw new Error('Erro ao deletar ordem de serviço: ' + (error as Error).message);
        }
    }
};
