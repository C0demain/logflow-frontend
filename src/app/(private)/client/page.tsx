"use client";

import { AuthContext } from "@/context/auth";
import { CreateClient } from "@/components/ClientService/createClient";
import { ReadClient } from "@/components/ClientService/readClient";
import { useContext, useEffect, useState } from "react";

export default function ClientPage() {
  const [crudAutorizado, setCrudAutorizado] = useState<boolean>(false)
  const setoresCrudPermitido = ["VENDAS", "DIRETORIA"]
  const {user} = useContext(AuthContext)

  useEffect(()=>{
    if(user){
      setoresCrudPermitido.includes(user.sector) ? setCrudAutorizado(true) : setCrudAutorizado(false)
    }
  }, [user])

  return (
    <div className="m-5 space-y-5">
      <div className="justify-between flex items-center">
        <h1 className="text-2xl">Lista de Clientes:</h1>
        {crudAutorizado && <CreateClient />}
      </div>
      <ReadClient 
      autorizado={crudAutorizado}/>
    </div>
  );
}
