import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from 'js-cookie';

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

    useEffect(() => {
        const storedTask = Cookies.get('task')
        if (storedTask) {
            try {
                const taskParse: taskProps = JSON.parse(storedTask)
                setTask(taskParse)
            } catch (error) {
                console.error("Error parsing task from cookie data", error)
            }
        }
    }, [])

    const readTask = (task: taskProps) => {
        setTask(task)
        Cookies.set('task', JSON.stringify(task), { expires: 1 });
    }

    const deleteTask = () => {
        setTask(undefined)
        Cookies.remove('task')
    }

    return (
        <TaskContext.Provider value={{ task, readTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    )
}

export { TaskContext, TaskProvider }
