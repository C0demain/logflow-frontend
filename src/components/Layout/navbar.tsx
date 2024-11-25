'use client';

import Link from "next/link";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "@/app/context/auth";
import { Logout } from "./logout";

export function Navbar() {
  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar bg-[#0975BB] shadow-md">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl hover:text-white">LogFlow</Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        {user?.role === "Motorista" ? null : (
          <ul className="menu menu-horizontal text-base px-1">
            <li className="hover:text-white"><Link href="/auth/dashboard">Dashboard</Link></li>
            <li className="hover:text-white"><Link href="/auth/service-order">Ordens de Serviço</Link></li>
            <li className="hover:text-white"><Link href="/auth/user">Funcionários</Link></li>
            <li className="hover:text-white"><Link href="/auth/client">Cliente</Link></li>
            <li className="hover:text-white"><Link href="/auth/documents">Documentos</Link></li>
            <li className="hover:text-white"><Link href="/auth/process">Processos</Link></li>
            <li className="hover:text-white"><Link href="/auth/chatsOptions">Chats</Link></li>
            <li className="hover:text-white"><Link href="/auth/vehicles">Veículos</Link></li>
          </ul>
        )}
      </div>

      <div className="navbar-end space-x-5 mr-5">
        {/* Dropdown do perfil */}
        <div className="relative" ref={profileMenuRef}>
          <button
            className="btn btn-circle btn-ghost hover:text-white"
            onClick={() => setProfileMenuOpen((prev) => !prev)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 20a6 6 0 0 0-12 0" />
              <circle cx="12" cy="10" r="4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </button>
          {profileMenuOpen && (
            <ul className="absolute right-0 top-full w-48 menu dropdown-content bg-base-100 rounded-box z-[1] p-2 shadow">
              <li><Link href="/auth/my-to-do-list">Minhas Tarefas</Link></li>
              <li><Link href="/auth/documents">Meus documentos</Link></li>
              <li><Logout /></li>
            </ul>
          )}
        </div>

        {/* Ícone do menu "hambúrguer" para telas pequenas */}
        <div className="relative lg:hidden" ref={menuRef}>
          <button
            className="btn btn-circle btn-ghost"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          {menuOpen && (
            <ul className="absolute right-0 top-full w-48 menu dropdown-content bg-base-100 rounded-box z-[1] p-2 shadow">
              <li><Link href="/auth/dashboard">Dashboard</Link></li>
              <li><Link href="/auth/service-order">Ordens de Serviço</Link></li>
              <li><Link href="/auth/user">Funcionários</Link></li>
              <li><Link href="/auth/client">Cliente</Link></li>
              <li><Link href="/auth/documents">Documentos</Link></li>
              <li><Link href="/auth/process">Processos</Link></li>
              <li><Link href="/auth/chatsOptions">Chats</Link></li>
              <li><Link href="/auth/vehicles">Veículos</Link></li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
