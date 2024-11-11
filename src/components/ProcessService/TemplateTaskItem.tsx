import { deleteTaskById } from "@/app/api/tasks/deleteTask";
import DeleteButton from "@/components/Shared/deleteButton";
import { Task } from "@/interfaces/task";
import { AccordionButton, AccordionItem, AccordionPanel, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface propsType {
    task: Task
}

export default function TemplateTaskItem(props: propsType) {
    const { task } = props
    const toast = useToast()
    const router = useRouter()

    const handleDelete = async (id: string) => {
        try {
            await deleteTaskById(id);
            toast({
                status: 'success',
                title: 'Sucesso',
                description: 'Tarefa removida com sucesso'
            })

            router.refresh()
        } catch (error: any) {
            toast({
                status: 'error',
                title: 'Erro',
                description: `Erro ao registrar Tarefa: ${error.message}`
            })
            console.log(error)
        }
    };

    return (
        <AccordionItem>
            <AccordionButton className="flex flex-row justify-between">
                <p className="text-2xl">{task.title}</p>
                <DeleteButton id={task.id || ''} handleDelete={handleDelete}>
                    <h1 className="text-2xl font-semibold mb-4">Deseja excluir essa tarefa?</h1>
                </DeleteButton>
            </AccordionButton>
            <AccordionPanel className="ml-8">
                <p className="text-1xl">Etapa</p>
                <p className="text-2xl mb-6">{task.stage}</p>
                <p className="text-1xl">Setor responsável</p>
                <p className="text-2xl mb-6">{task.sector}</p>
                <p className="text-1xl">Cargo relacionado</p>
                <p className="text-2xl">{task.role?.name}</p>
            </AccordionPanel>
        </AccordionItem>
    )
}