'use client'

import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";
import Loading from "../loading";
import { AuthContext } from "../context/auth";
import { loginPut } from "../api/userService/login";
import { isAxiosError } from "axios";
import useToasts from "@/hooks/useToasts";

export default function Login() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const { login } = useContext(AuthContext)
  const { showToastOnReload, showToast } = useToasts()

  async function logon(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); // Inicia o estado de loading
    try {
      const response = await loginPut(email, password);

      if (response) {
        router.push('/auth/service-order');
        const { token, id, role, sector } = response;
        login({ token, id, role, sector });
        showToast("Login realizado com sucesso", 'success')
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        showToast(error.message, 'error')
      } else {
        showToast(error.message, 'error')
      }
    } finally {
      setLoading(false); // Finaliza o estado de loading
    }
  }

  if (loading) {
    return <Loading />; // Retorna a tela de loading enquanto o login está em processo
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Seção da esquerda */}
      <div className="bg-gradient-to-r from-sky-700 to-sky-400 flex flex-col justify-center items-center w-full md:w-2/5 p-6">
        <div className="mb-16 md:mb-44 text-center">
          <h1 className="text-white font-bold text-[2rem] md:text-[3rem]">LogFlow</h1>
          <p className="text-white text-[1.2rem] md:text-[1.5rem]">Logística Integrada e Armazéns Gerais</p>
        </div>
      </div>

      {/* Seção da direita */}
      <div className="bg-slate-100 flex flex-col justify-center items-center w-full md:w-3/5 p-6">
        <div className="mb-16 md:mb-24 md:mr-32">
          <h1 className="mb-1 text-black font-bold text-[1.2rem] md:text-[1.5rem]">Olá de novo!</h1>
          <p className="mb-8 text-black text-[0.9rem] md:text-[1rem]">Bem vindo de volta.</p>

          {/* Formulário */}
          <form onSubmit={logon}>
            <div className="mb-4 md:mb-6 bg-slate-200 input input-bordered rounded-full flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" className="grow" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            </div>

            <div className="mb-4 md:mb-6 bg-slate-200 input input-bordered rounded-full flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
              </svg>
              <input type="password" className="grow" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
            </div>

            <input type="submit" className="bg-sky-600 text-white hover:bg-sky-500 btn btn-wide rounded-full" />
          </form>
        </div>
      </div>
    </div>

  );
}
