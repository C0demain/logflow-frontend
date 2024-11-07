"use client";

import { registerProcess } from "@/app/api/process/registerProcess";
import CreateButton from "@/components/createButton";
import ProcessForm from "@/components/ProcessService/ProcessForm";
import { ProcessesList } from "@/components/ProcessService/ProcessList";
import { Process } from "@/interfaces/process";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";


export default function ProcessListPage() {
  const toast = useToast()
  const router = useRouter()
  
  const createProcess = async (data: Partial<Process>) => {
    try{
      await registerProcess(data)
      toast({
        status: 'success',
        title: 'Sucesso',
        description: 'Processo criado com sucesso'
      })

      router.refresh()
    }catch(error: any){
      toast({
        status: 'error',
        title: 'Erro',
        description: error.message
      })
    }
  }

  return (
    <div className="m-5">
        <h1 className="text-3xl font-bold">Processos</h1>
        <CreateButton>
          <ProcessForm formTitle="Criar novo processo" onSubmit={createProcess}/>
        </CreateButton>
        <ProcessesList/>
    </div>
  );
}
