"use client";

import { CreateClient } from "@/components/ClientService/createClient"; // Verifique se o caminho do componente CreateClient está correto// Importa o componente que lista os clientes
import { ReadClient } from "@/components/ClientService/readClient";
import { useState } from "react";

export default function ClientPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="m-5 space-y-5 relative">
      <div className="justify-between flex items-center">
        <h1 className="text-2xl">Lista de Clientes:</h1>
        <CreateClient />
      </div>

      <div className="flex flex-col space-y-5 sm:flex-row sm:space-y-0 sm:space-x-5">
        <div className="flex-1">
          <ReadClient /> {/* Renderiza a lista de clientes aqui */}
        </div>
      </div>
    </div>
  );
}
