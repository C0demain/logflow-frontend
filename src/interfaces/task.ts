import { Sector } from "@/enums/sector";
import { TaskStage } from "@/enums/taskStage";

export interface Task{
    id?: string
    title?: string;
    sector?: Sector;
    startedAt?: Date | null;
    completedAt?: Date | null;
    dueDate?: Date | null;
    stage?: TaskStage;
    taskCost?: number | null;
    serviceOrder?: {
        id: string,
        title: string
    };
    assignedUser?: {
        id: string,
        name: string,
        email: string
    };
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