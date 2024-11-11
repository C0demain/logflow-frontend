import { Sector } from "@/enums/sector";
import { TaskStage } from "@/enums/taskStage";
import Role from "@/interfaces/role";

export default interface TemplateTask{
    id?: string
    title: string;
    sector: `${Sector}`;
    role: Role
    stage: TaskStage;
    taskCost?: number
    address?: {
        zipCode: string,
        state: string,
        city: string,
        neighborhood: string,
        street: string,
        number: string,
        complement?: string,
    }
     files?: Array<{
        id: string,
        filename: string,
    }>
}