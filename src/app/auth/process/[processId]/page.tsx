'use client'

import { getSingleProcess } from "@/app/api/process/getSingleProcess"
import { CreateTemplateTaskDto, registerTemplateTask } from "@/app/api/tasks/registerTemplateTask"
import Loading from "@/app/loading"
import CreateButton from "@/components/Shared/createButton"
import Empty from "@/components/Shared/Empty"
import TemplateTaskForm from "@/components/ProcessService/TemplateTaskForm"
import TemplateTaskItem from "@/components/ProcessService/TemplateTaskItem"
import { Sector } from "@/enums/sector"
import { TaskStage } from "@/enums/taskStage"
import { Process } from "@/interfaces/process"
import { Task } from "@/interfaces/task"
import { Accordion } from "@chakra-ui/react"
import { useParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import useToasts from "@/hooks/useToasts"

export default function SingleProcessPage() {
  const { processId } = useParams()
  const [processData, setProcessData] = useState<Process>()
  const [loading, setLoading] = useState(true)
  const {showToast, showToastOnReload} = useToasts()

  const fetchProcess = useCallback(async () => {
    const process = await getSingleProcess(String(processId))
    setProcessData(process)
    setLoading(false)
  }, [])

  const createTemplateTask = async (data: Partial<CreateTemplateTaskDto>) => {
    try {
      await registerTemplateTask({
        title: data.title || 'Sem título',
        sector: data.sector || Sector.OPERACIONAL,
        processId: String(processId),
        roleId: data.roleId || '',
        stage: data.stage || TaskStage.SALE_COMPLETED

      })
      showToastOnReload('Tarefa criada com sucesso', 'success')

      window.location.reload()
    } catch (error: any) {
      showToast(error.message, 'error')
    }
  }

  useEffect(() => {
    fetchProcess()
  }, [fetchProcess])

  if (loading) {
    return <Loading />
  }

  if (!processData) {
    return <Empty title="Não foi possível carregar essa página" />
  }

  return (
    <div className="m-5">
      <h1 className="text-3xl font-bold mb-8">{processData.title}</h1>
      <CreateButton >
        <TemplateTaskForm formTitle="Nova tarefa" onSubmit={createTemplateTask} />
      </CreateButton>
      {processData.tasks.length > 0 && processData.tasks.map((task: Task) => (
        <Accordion allowMultiple className="bg-white h-auto" key={task.id}>
          <TemplateTaskItem task={task} />
        </Accordion>
      ))}
    </div>
  )
}