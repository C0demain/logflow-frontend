'use client'

import Link from "next/link";
import { Logout } from "./logout"; // Importando diretamente
import { useContext } from "react";
import { AuthContext } from "@/app/context/auth";

export function Navbar() {
    const {user} = useContext(AuthContext)

    return (
        <div className="navbar bg-[#0975BB] shadow-md">
            <div className="navbar-start">
                <Link href="/" className="btn btn-ghost text-xl hover:text-white">JJM Log</Link>
            </div>
            <div className="navbar-center flex">
                    {user?.role === "Motorista" ?
                        <></> : 
                        <ul className="menu menu-horizontal text-base text px-1">
                            <li className="hover:text-white"><Link href="/auth/orderservice">Ordens de Serviço</Link></li>
                            <li className="hover:text-white"><Link href="/auth/user">Funcionários</Link></li>
                            <li className="hover:text-white"><Link href="/auth/client">Cliente</Link></li>
                            <li className="hover:text-white"><Link href="/auth/driver">Motorista</Link></li>
                        </ul>
                    }
                
            </div>
            <div className="navbar-end space-x-5 mr-5">
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
                <details className="dropdown dropdown-end dropdown-hover">
                    <summary className="btn btn-circle btn-ghost hover:text-white">                    
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/>
                        </svg>
                    </summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] p-2 shadow">
                        <Logout /> {/* Componente de Logout diretamente importado */}
                    </ul>
                </details>
            </div>
        </div>
    );
}
