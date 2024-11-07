import { Task } from "@/interfaces/task"

export interface Process{
    id?: string
    title: string
    tasks: Task[]
}