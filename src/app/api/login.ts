import axios, { AxiosError, isAxiosError } from "axios";
import Cookies from 'js-cookie'

interface LoginResponse {
    token: string;
    id: string;
    role: string;
    sector: string;
    // Adicione outras propriedades que você espera na resposta, se houver
}

export async function loginPut(email: string, password: string): Promise<LoginResponse | undefined> {
    try {
        const response = await axios.post('https://localhost:8000/api/v1/auth/login', { email, password });
        console.log(response.data);
        
        if (response.data.token && response.data.id) {
            // Use js-cookie para armazenar os cookies no cliente
            Cookies.set('token', response.data.token, { expires: 1, path: '/' }); // Cookie do token expire em 1 dia
        }

        return response.data;
    } catch (error: unknown) {
        if(isAxiosError(error)){
            if(error.response?.status === 404 || error.response?.status === 401){
                throw new AxiosError("Email ou senha incorretos")
            }

            throw new AxiosError("Erro ao conectar ao servidor. Tente novamente")
        }
    }
}