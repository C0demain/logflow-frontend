"use client"
import { getTasks, TaskData } from "@/app/api/tasks/listTasks"
import { AuthContext } from "@/app/context/auth"
import { TaskProvider } from "@/app/context/task"
import { ReadUnitTask } from "@/components/TaskService/readUnitTask"
import TodoList from "@/components/TaskService/todoList"
import { useContext, useEffect, useState } from "react"

export default function MyToDoList(){
    const {user} = useContext(AuthContext)
    const [tasks, setTasks] = useState<TaskData[]>()

    const fetchTasks = async() => {
        try {
            const response = getTasks('', '', user?.id, '', '')
            setTasks((await response).tasks)
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        fetchTasks()
    }, [user])

    return(
        <div className="flex space-x-2">
            <TaskProvider>
            <div className="w-1/2 flex flex-col"> 
                <TodoList tasks={tasks} sectorName="Tarefas do usuário" onUpdateTaskList={fetchTasks}/>
            </div>
            <div className="w-1/2 flex flex-col">
                <ReadUnitTask myTask={true}/>
            </div>
            </TaskProvider>
        </div>
    )
}