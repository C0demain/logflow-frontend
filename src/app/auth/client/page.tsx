"use client";

import { CreateClient } from "@/components/ClientService/createClient";
import { ReadClient } from "@/components/ClientService/readClient";
import { useState } from "react";

export default function ClientPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="m-5 space-y-5">
      <div className="justify-between flex items-center">
        <h1 className="text-2xl">Lista de Clientes:</h1>
        <CreateClient />
      </div>
      <ReadClient />
    </div>
  );
}
