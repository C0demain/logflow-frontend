"use client";
import { useState } from "react";
import { CreateUser } from "@/components/UserService/createUser";
import { ReadUsers } from "@/components/UserService/listUser";

export default function UserPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="m-5 space-y-5">
      <div className="justify-between flex items-center">
        <h1 className="text-2xl">Lista de Funcionários:</h1>
      </div>

      <div className="flex flex-col space-y-5 sm:flex-row sm:space-y-0 sm:space-x-5">
        <div className="flex-1">
          <ReadUsers />
        </div>
      </div>
      <CreateUser />
    </div>
  );
}
