'use client'

import { useState, useCallback, useEffect } from "react";
import Loading from "@/app/loading";
import Empty from "@/components/Empty";
import { getProcesses } from "@/app/api/process/getProcesses";
import { Process } from "@/interfaces/process";
import DeleteButton from "@/components/deleteButton";
import { deleteProcess } from "@/app/api/process/deleteProcess";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaCircleInfo } from "react-icons/fa6";

export const ProcessesList: React.FC = () => {
  const [data, setData] = useState<Process[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast()
  const router = useRouter()

  const removeProcess = async (id: string) => {
    try{
      await deleteProcess(id)
      toast({
        status: 'success',
        title: 'Sucesso',
        description: 'Processo removido com sucesso'
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

  const fetchProcesses = useCallback(async () => {
    try {
      const response = await getProcesses();
      console.log(response)
      if (Array.isArray(response)) {
        setData(response);
      } else {
        setError("Dados dos processos não estão no formato esperado.");
      }
      setLoading(false)
      console.log(response)
    } catch (error) {
      console.error("Error fetching processes:", error);
      setError("Não foi possível carregar os processos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProcesses();
  }, [fetchProcesses]);
    

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return <Empty title="Ainda não há processos cadastrados"/>
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      {data.length > 0 && data.map(process => {
        return (
          <div 
          className="flex flex-row items-center justify-between p-3 sm:p-3 rounded-md w-full bg-white hover:bg-gray-100" 
          key={process.id} 
          >
            <p className="text-2xl">{process.title}</p>
            <div className="flex flex-row items-center justify-between space-x-2">
              <button 
              className="btn btn-md hover:bg-slate-400 hover:text-white hover:shadow-md"
              onClick={() => {router.push(`./process/${process.id}`)}}
              >
              <FaCircleInfo />
              </button>
              <DeleteButton id={process.id || ''} handleDelete={removeProcess}>
                <h1 className="text-2xl font-semibold mb-4">Deseja excluir esse processo?</h1>
              </DeleteButton>
            </div>
          </div>
        )
      })}
    </div>
  );
}
