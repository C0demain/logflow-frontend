import { cookies } from "next/headers";

export default function getAuthToken(){
    const storedCookies = cookies()

    const token = storedCookies.get('token')
    return token?.value
}