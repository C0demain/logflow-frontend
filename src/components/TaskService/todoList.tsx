import { useEffect } from "react";
import TaskItem from "./taskItem";

interface TodoListProps {
  sectorName: string;
  userId: string;
  orderId: string;
  tasks: any[] | undefined;
  onAllTasksCompleted: () => void;
}

export default function TodoList({ sectorName, userId, orderId, tasks, onAllTasksCompleted }: TodoListProps) {
  
  useEffect(() => {
    if (tasks && tasks.length > 0 && tasks.every(task => task.completed)) {
      onAllTasksCompleted(sectorName);
    }
  }, [tasks, onAllTasksCompleted, sectorName]);

  return (
    <div className="bg-gray-100 p-5 rounded-md shadow-lg w-96">
      <h1 className="text-xl">Tarefas {sectorName}</h1>
      {tasks?.map((task) => (
        <TaskItem
          key={task.id}
          userId={userId}
          idTask={task.id}
          completed={task.completed}
          title={task.title}
        />
      ))}
    </div>
  );
}
