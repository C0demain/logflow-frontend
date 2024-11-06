import { completeTask } from "@/app/api/tasks/taskUtil";
import { uncompleteTask } from "@/app/api/tasks/taskUtil";
import { useParams } from "next/navigation";
import { ChangeEvent, useContext, useState } from "react";
import { TaskContext } from "@/app/context/task";

interface TaskItemProps {
  idTask: string;
  completed: boolean;
  title: string;
  onChecked: () => void;
}

export default function TaskItem({ idTask, completed, title, onChecked}: TaskItemProps) {
  const params = useParams<{userId: string, orderId: string}>();
  const [completedTask, setCompletedTask] = useState<boolean>(completed);
  const { readTask } = useContext(TaskContext)
  
  const handleCheckboxChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newCompletedStatus = e.target.checked;
    setCompletedTask(newCompletedStatus);
    try {
      newCompletedStatus ? await completeTask(idTask) : await uncompleteTask(idTask);
      onChecked()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-row w-full p-1 m-1 bg-slate-100 items-center justify-between rounded-md hover:bg-slate-200 cursor-pointer" onClick={() => readTask({id: idTask})}>
      <div className="flex flex-row w-3/5 space-x-2 items-center">
        <input
          type="checkbox"
          checked={completedTask}
          onChange={handleCheckboxChange}
          className="checkbox checkbox-lg checkbox-info transition"
        />
        <span className="w-full h-full">{title}</span>
      </div>
    </div>
  );
}