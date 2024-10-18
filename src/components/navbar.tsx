'use client'

import Link from "next/link";
import { Logout } from "./logout"; // Importando diretamente
import { useContext } from "react";
import { AuthContext } from "@/app/context/auth";

export function Navbar() {
  const { user } = useContext(AuthContext)

  return (
    <div className="navbar bg-[#0975BB] shadow-md">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl hover:text-white">LogFlow</Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        {user?.role === "Motorista" ? null : (
          <ul className="menu menu-horizontal text-base px-1">
            <li className="hover:text-white"><Link href="/auth/orderservice">Ordens de Serviço</Link></li>
            <li className="hover:text-white"><Link href="/auth/user">Funcionários</Link></li>
            <li className="hover:text-white"><Link href="/auth/client">Cliente</Link></li>
            <li className="hover:text-white"><Link href="/auth/driver">Motorista</Link></li>
          </ul>
        )}
      </div>

      <div className="navbar-end space-x-5 mr-5">
        {/* Dropdown do perfil */}
        <details className="dropdown dropdown-end dropdown-hover">
          <summary className="btn btn-circle btn-ghost hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 20a6 6 0 0 0-12 0" />
              <circle cx="12" cy="10" r="4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] p-2 shadow">
            <Logout /> {/* Componente de Logout */}
          </ul>
        </details>

        {/* Ícone do menu "hambúrguer" para telas pequenas */}
        <div className="lg:hidden">
          <details className="dropdown dropdown-end dropdown-hover">
            <summary className="btn btn-circle btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] p-2 shadow">
              <li><Link href="/auth/orderservice">Ordens de Serviço</Link></li>
              <li><Link href="/auth/user">Funcionários</Link></li>
              <li><Link href="/auth/client">Cliente</Link></li>
              <li><Link href="/auth/driver">Motorista</Link></li>
            </ul>
          </details>
        </div>
      </div>
    </div>

  );
}
