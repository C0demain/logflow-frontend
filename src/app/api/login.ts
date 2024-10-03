'use server'

import axios from "axios";
import { cookies } from "next/dist/client/components/headers";

export async function login(email: string, password: string): Promise<undefined> {
    const response = await axios.post('http://localhost:8000/api/v1/auth/login', { email, password })
    console.log(response.data)
    if (response.data.token && response.data.id) {
        const storedCookies = cookies()
        storedCookies.set('token', response.data.token, { httpOnly: true, secure: true, path: '/' })
        storedCookies.set('id', response.data.id, { httpOnly: true, secure: true, path: '/' })
    }
}