import { Task } from "@/interfaces/task";
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from "@chakra-ui/react";

interface propsType{
    task: Task
}

export default function TemplateTaskItem(props: propsType){
    const {task} = props

    return (
        <AccordionItem>
            <AccordionButton>
                <p className="text-2xl">{task.title}</p>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>

            </AccordionPanel>
        </AccordionItem>
        
    )

}