'use client'

import Link from "next/link";
import { Logout } from "./logout"; // Importando diretamente

export function Navbar() {
    return (
        <div className="navbar bg-[#0975BB] shadow-md">
            <div className="navbar-start">
                <Link href="/" className="btn btn-ghost text-xl">JJM Log</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link href="/auth/orderService">Ordens de Serviço</Link></li>
                    <li><Link href="/auth/register">Registro</Link></li>
                    <li><Link href="/auth/todolist">Lista de Tarefas</Link></li>
                    <li><Link href="/auth/userEdit">Editar Funcionários</Link></li>
                    <li><Link href="/auth/client">Cliente</Link></li>
                </ul>
            </div>
            <div className="navbar-end space-x-5 mr-5">
                <details className="dropdown">
                    <summary className="btn btn-sm m-1">User</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] p-2 shadow">
                        <Logout /> {/* Componente de Logout diretamente importado */}
                    </ul>
                </details>
                <div className="indicator">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
            </div>
        </div>
    );
}
