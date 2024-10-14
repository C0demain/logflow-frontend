import axios from "axios";
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
        const response = await axios.post('http://localhost:8000/api/v1/auth/login', { email, password });
        console.log(response.data);
        
        if (response.data.token && response.data.id) {
            // Use js-cookie para armazenar os cookies no cliente
            Cookies.set('token', response.data.token, { expires: 1, path: '/' }); // expire em 1 dia
            Cookies.set('id', response.data.id, { expires: 1, path: '/' });
            Cookies.set('role', response.data.role, { expires: 1, path: '/' });
        }

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error('Erro ao registrar ordem de serviço: ' + error.response?.data.message);
        } else {
            throw new Error('Erro ao registrar ordem de serviço: ' + (error as Error).message);
        }
    }
}
