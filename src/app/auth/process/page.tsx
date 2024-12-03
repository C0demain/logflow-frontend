"use client";

import { registerProcess } from "@/app/api/process/registerProcess";
import CreateButton from "@/components/Shared/createButton";
import ProcessForm from "@/components/ProcessService/ProcessForm";
import { ProcessesList } from "@/components/ProcessService/ProcessList";
import { Process } from "@/interfaces/process";
import useToasts from "@/hooks/useToasts";

export default function ProcessListPage() {
  const {showToastOnReload, showToast} = useToasts()

  const createProcess = async (data: Partial<Process>) => {
    try {
      await registerProcess(data)
      showToastOnReload('Processo criado com sucesso', 'success')

      window.location.reload()
    } catch (error: any) {
      showToast(error.message, 'error')
    }
  }

  return (
    <div className="m-5">
      <h1 className="text-3xl font-bold mb-8">Processos</h1>
      <CreateButton>
        <ProcessForm formTitle="Criar novo processo" onSubmit={createProcess} />
      </CreateButton>
      <ProcessesList />
    </div>
  );
}
