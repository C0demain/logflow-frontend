import TaskItem from "./taskItem";
import { TaskData } from "@/app/api/tasks/listTasks";

interface ToDoListProps {
  sectorName: string;
  tasks: TaskData[];
  name: string;
  onUpdateTaskList: () => void;
}

export default function ToDoList({
  sectorName,
  tasks,
  name,
  onUpdateTaskList,
}: ToDoListProps) {

  return (
    <div className="flex flex-col w-full bg-gray-100 p-5 rounded-md shadow-lg">
      <h1 className="text-xl">Tarefas {name}</h1>
      {tasks.map((task) => (
        <TaskItem
          onChecked={onUpdateTaskList}
          key={task.id}
          idTask={task.id}
          completed={task.completed}
          title={task.title}
          sectorName={sectorName}
        />
      ))}
    </div>
  );
}
