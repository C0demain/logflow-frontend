"use client";

import { AuthContext } from "@/app/context/auth";
import { CreateDocuments } from "@/components/DocumentService/createDocument";
import { ReadDocuments } from "@/components/DocumentService/readDocuments";
import { useContext, useEffect, useState } from "react";

interface DocumentsProps {
  params: {
    userId: string;
  };
}

export default function DocumentsPage({ params }: DocumentsProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [crudAutorizado, setCrudAutorizado] = useState<boolean>(false)
  const setoresCrudPermitido = ["VENDAS", "DIRETORIA", "RH", "OPERACIONAL", "FINCANCEIRO"]
  const { user } = useContext(AuthContext)
  const [userId, setUserId] = useState(params.userId || user?.id)

  useEffect(() => {
    if (user) {
      setoresCrudPermitido.includes(user.sector) ? setCrudAutorizado(true) : setCrudAutorizado(false)
      setUserId(params?.userId || user.id)
    }
  }, [user])

  return (
    <div className="m-5 space-y-5">
      <div className="justify-between flex items-center">
        <h1 className="text-2xl">Documentos:</h1>
        {crudAutorizado && <CreateDocuments taskId="" id={userId} />}
      </div>
      <ReadDocuments taskId="" userId={userId} />
    </div>
  );
}
