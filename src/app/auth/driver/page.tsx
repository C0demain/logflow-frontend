"use client"
import { useState } from "react";
import { CreateUser } from "@/components/UserService/createUser";
import { ReadUsers } from "@/components/UserService/listUser";

export default function UserPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="m-5 space-y-5 relative">
      <div className="justify-between flex items-center">
        <h1 className="text-2xl">Motorista</h1>
        <button onClick={toggleModal} className="btn btn-primary">
          Adicionar Funcionário
        </button>
      </div>

      <div className="flex flex-col space-y-5 sm:flex-row sm:space-y-0 sm:space-x-5">
        <div className="flex-1">
          {/* Placeholder for the client list or other content can go here */}
        </div>
      </div>

      <div>
        <ReadUsers />
      </div>

      {/* Modal for CreateUser */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl relative">
            <button onClick={toggleModal} className="absolute right-2 top-2 text-xl">
              &times;
            </button>
            <CreateUser />
          </div>
        </div>
      )}
    </div>
  );
}
