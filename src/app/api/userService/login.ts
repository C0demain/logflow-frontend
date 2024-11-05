import { apiBackend } from "@/app/util/baseURL";
import axios, { AxiosError, isAxiosError } from "axios";
import Cookies from 'js-cookie'

interface LoginResponse {
    token: string;
    id: string;
    role: string;
    sector: string;
}

export async function loginPut(email: string, password: string): Promise<LoginResponse | undefined> {
    try {
        const response = await axios.post(`${apiBackend}/api/v1/auth/login`, { email, password });

        if (response.data.token && response.data.id) {
            Cookies.set('token', response.data.token, { expires: 1, path: '/' }); // expire em 1 dia
        }

        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            if (error.response?.status === 404 || error.response?.status === 401) {
                throw new AxiosError("Email ou senha incorretos")
            }

            throw new AxiosError("Erro ao conectar ao servidor. Tente novamente")
        }
    }
}