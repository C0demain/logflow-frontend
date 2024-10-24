"use client";

import { AuthContext } from "@/app/context/auth";
import { CreateDocuments } from "@/components/DocumentService/createDocument";
import { ReadDocuments } from "@/components/DocumentService/readDocuments";
import { useContext, useEffect, useState } from "react";

export default function ClientPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [crudAutorizado, setCrudAutorizado] = useState<boolean>(false)
  const setoresCrudPermitido = ["VENDAS", "DIRETORIA", "RH", "OPERACIONAL", "FINCANCEIRO"]
  const {user} = useContext(AuthContext)

  useEffect(()=>{
    if(user){
      setoresCrudPermitido.includes(user.sector) ? setCrudAutorizado(true) : setCrudAutorizado(false)
    }
  }, [user])

  return (
    <div className="m-5 space-y-5">
      <div className="justify-between flex items-center">
        <h1 className="text-2xl">Documentos:</h1>
        {crudAutorizado && <CreateDocuments />}
      </div>
      <ReadDocuments />
    </div>
  );
}
