'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@chakra-ui/react";

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
        <Button
            onClick={handleLogout}
            size="sm"
            colorScheme="blue"
            bg="blue.600"
            color="white"
            _hover={{ bg: "blue.700" }}
            _active={{ bg: "blue.800" }}
        >
            Sair
        </Button>
    );
}
