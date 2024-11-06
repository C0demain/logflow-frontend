import { createApiInstances } from "@/app/util/baseURL";
import axios, { AxiosError } from "axios";

export const downloadById = async (id: string, name: string) => {
    const { apiLogin, apiInstance } = await createApiInstances();
    try {
        const response = await apiInstance.get(`/api/v1/files/${id}`, {
            responseType: 'blob' // Define o tipo de resposta como Blob
        });

        // Cria um link para download do Blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = `documento_${name}`; // Altere a extensão conforme necessário
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url); // Libera a URL criada

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if(error?.response?.status === 400) {
                throw new AxiosError(error.response.data?.message);
            } else {
                throw new AxiosError('Erro ao conectar ao servidor. Tente novamente');
            }
        } else {
            throw new Error('Erro inesperado ao baixar o documento.');
        }
    }
};
