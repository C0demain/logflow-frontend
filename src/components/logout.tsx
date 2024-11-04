"use client";

import { AuthContext } from "@/app/context/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export function Logout() {
  const router = useRouter();
  const { logout } = useContext(AuthContext);

  async function handleLogout() {
    try {
      const response = await axios.delete("/api/deleteToken");
      logout();
      router.push("/");
      closeModal();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }

  const openModal = () => {
    const modal = document.getElementById("my_modal_4") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const closeModal = () => {
    const modal = document.getElementById("my_modal_4") as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  return (
    <div>
      <button className="btn btn-ghost" onClick={openModal}>
        Sair
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-md md:w-3/12 md:max-w-5xl">
          <p className="text-lg md:text-xl mb-4 md:mb-6 text-center">Deseja sair da sua conta?</p>
          <div className="flex flex-col md:flex-row w-full justify-center items-center space-y-4 md:space-y-0 md:space-x-7">
            <button
              className="btn btn-info text-white w-full md:w-auto"
              onClick={handleLogout}
            >
              Sim
            </button>
            <form method="dialog" className="w-full md:w-auto">
              <button className="btn btn-error text-white w-full md:w-auto">Não</button>
            </form>
          </div>
        </div>
      </dialog>
  </div>
  
  );
}
