'use server'
import axios, { AxiosError, isAxiosError } from "axios";
import { cookies } from "next/dist/client/components/headers";

export async function login(email: string, password: string): Promise<undefined>{
    try{
        const response = await axios.post('http://localhost:8000/api/v1/auth/login', {email, password})
        if(response.data.token && response.data.id){
            const storedCookies = cookies()
            storedCookies.set('token', response.data.token, {httpOnly: true, secure: true, path: '/'})
            storedCookies.set('id', response.data.id, {httpOnly: true, secure: true, path: '/'})
        }
    }catch(e){
        if(isAxiosError(e)){
            if(e.response?.status === 404 || e.response?.status === 401){
                throw new AxiosError("Email ou senha incorretos")
            }

            throw new AxiosError("Erro ao conectar ao servidor. Tente novamente")
        }
        console.log(e)
        throw e
    }

}