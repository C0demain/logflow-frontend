"use client";

import CreateClient from "@/components/createClient"; // Ensure your CreateClient component path is correct
import { useState } from "react";

export default function RequestList() {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="m-5 space-y-5 relative">
      <div className="justify-between flex items-center">
        <h1 className="text-2xl">Lista de Clientes:</h1>
        <button onClick={toggleModal} className="btn btn-primary">
          Adicionar Cliente
        </button>
      </div>

      <div className="flex flex-col space-y-5 sm:flex-row sm:space-y-0 sm:space-x-5">
        <div className="flex-1">
          {/* Placeholder for the client list or other content can go here */}
        </div>
      </div>

      {/* Modal for CreateClient */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl relative">
            <button onClick={toggleModal} className="absolute right-2 top-2 text-xl">
              &times;
            </button>
            <CreateClient onClose={toggleModal} />
          </div>
        </div>
      )}
    </div>
  );
}
