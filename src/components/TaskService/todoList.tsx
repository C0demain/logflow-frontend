import TaskItem from "./taskItem";
import { TaskData } from "@/app/api/tasks/listTasks";

interface TodoListProps {
  sectorName: string;
  tasks: TaskData[] | undefined;
  onUpdateTaskList: () => void;
}

export default function TodoList({
  sectorName,
  tasks,
  onUpdateTaskList,
}: TodoListProps) {

  return (
    <div className="flex flex-col w-full bg-white p-2 rounded-md shadow-lg">
      <h1 className="text-xl">{sectorName}</h1>
      {tasks?.map((task) => (
        <TaskItem
          onChecked={onUpdateTaskList}
          key={task.id}
          idTask={task.id}
          completed={task.completedAt !== null}
          title={task.title}
        />
      ))}
    </div>
  );
}
