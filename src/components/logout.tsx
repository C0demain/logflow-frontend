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
      console.log(response.data);
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
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn btn-ghost" onClick={openModal}>
        Sair
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-3/12 max-w-5xl">
          <p className="text-xl mb-6">Deseja sair da sua conta?</p>
          <div className="flex w-full justify-center space-x-7">
              <button
                className="btn btn-info text-white"
                onClick={handleLogout}
              >
                Sim
              </button>
              <form method="dialog">
                <button className="btn btn-error text-white">Não</button>
              </form>
            </div>
        </div>
      </dialog>
    </div>
  );
}
