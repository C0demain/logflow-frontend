'use client';

import axios from "axios";
import { useRouter } from "next/navigation";

export function Logout() {
    const router = useRouter();

    async function handleLogout() {
        try {
            await axios.delete('/api/deleteToken');
            router.push("/");
            closeModal();
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    }

    const closeModal = () => {
        const modal = document.getElementById('my_modal_4') as HTMLDialogElement;
        if (modal) {
            modal.close();
        }
    };

    return (
        <div>
            <label htmlFor="logout" onClick={handleLogout} className="btn btn-sm bg-blue-600 text-white">Sair</label>
        </div>
    );
};
