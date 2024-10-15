import { useQuery } from "@tanstack/react-query";
import TaskItem from "./taskItem";
import { getTasks, TaskData } from "@/app/api/tasks/listTasks";

interface TodoListProps {
  sectorName: string;
  tasks: TaskData[];
  onAllTasksCompleted: () => void;
}

export default function TodoList({
  sectorName,
  tasks,
  onAllTasksCompleted,
}: TodoListProps) {

  const { data } = useQuery({
    queryKey: ["tasks"],
  });

  const handleTaskCompletion = () => {
    onAllTasksCompleted();
  };

  return (
    <div className="flex flex-col w-full bg-gray-100 p-5 rounded-md shadow-lg">
      <h1 className="text-xl">Tarefas {sectorName}</h1>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          idTask={task.id}
          completed={task.completed}
          title={task.title}
          sectorName={sectorName}
          onTaskCompletion={handleTaskCompletion}
        />
      ))}
    </div>
  );
}
