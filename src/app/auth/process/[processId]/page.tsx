'use client'

import { getSingleProcess } from "@/app/api/process/getSingleProcess"
import { CreateTemplateTaskDto, registerTemplateTask } from "@/app/api/tasks/registerTemplateTask"
import Loading from "@/app/loading"
import CreateButton from "@/components/createButton"
import Empty from "@/components/Empty"
import TemplateTaskForm from "@/components/ProcessService/TemplateTaskForm"
import TemplateTaskItem from "@/components/ProcessService/TemplateTaskItem"
import { Sector } from "@/enums/sector"
import { TaskStage } from "@/enums/taskStage"
import { Process } from "@/interfaces/process"
import { Task } from "@/interfaces/task"
import TemplateTask from "@/interfaces/templateTask"
import { Accordion, useToast } from "@chakra-ui/react"
import { useParams, useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

export default function SingleProcessPage(){
    const { processId } = useParams()
    const [processData, setProcessData] = useState<Process>()
    const [loading, setLoading] = useState(true)
    const toast = useToast()
    const router = useRouter()

    const fetchProcess = useCallback(async () => {
        const process = await getSingleProcess(String(processId))
        setProcessData(process)
        setLoading(false)
    }, [])

    const createTemplateTask = async (data: Partial<CreateTemplateTaskDto>) => {
        try{
          await registerTemplateTask({
            title: data.title || 'Sem título',
            sector: data.sector || Sector.OPERACIONAL,
            processId: String(processId),
            roleId: data.roleId || '',
            stage: data.stage || TaskStage.SALE_COMPLETED

          })
          toast({
            status: 'success',
            title: 'Sucesso',
            description: 'Tarefa criada com sucesso'
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

    useEffect(() => {
        fetchProcess()
    }, [fetchProcess])

    if(loading){
        return <Loading/>
    }

    if(!processData){
        return <Empty title="Não foi possível carregar essa página"/>
    }

    return (
        <div className="m-5">
            <h1 className="text-5xl mb-16">{processData.title}</h1>
            <CreateButton >
                <TemplateTaskForm formTitle="Nova tarefa" onSubmit={createTemplateTask}/>
            </CreateButton>
            {processData.tasks.length > 0 && processData.tasks.map((task: Task) => (
                <Accordion allowMultiple className="bg-white h-auto">
                    <TemplateTaskItem task={task}/>
                </Accordion>
            ) )}
        </div>
    )
}