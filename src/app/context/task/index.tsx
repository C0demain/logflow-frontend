import { createContext, ReactNode, useEffect, useState } from "react";

export type taskProps = {
    id: string;
}

type TaskContextProps = {
    task: taskProps | undefined;
    readTask: (task: taskProps) => void;
    deleteTask: () => void;
}

const TaskContext = createContext<TaskContextProps>({} as TaskContextProps);

const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [task, setTask] = useState<taskProps | undefined>(undefined)

    const readTask = (task: taskProps) => {
        setTask(task)
    }

    const deleteTask = () => {
        setTask(undefined)
    }

    return (
        <TaskContext.Provider value={{ task, readTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    )
}

export { TaskContext, TaskProvider }
