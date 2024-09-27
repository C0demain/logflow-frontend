import { updateTask } from "@/app/api/tasks/updateTask";
import { ChangeEvent, useState } from "react";
import { DeleteTask } from "./deleteTask";

interface TaskItemProps {
  idTask: string;
  completed: boolean;
  title: string;
  userId: string;
}

export default function TaskItem({ idTask, completed, title, userId }: TaskItemProps) {
  const [completedTask, setCompletedTask] = useState<boolean>(completed);

  const handleCheckboxChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newCompletedStatus = e.target.checked;
    setCompletedTask(newCompletedStatus);
    try {
      await updateTask({ title: title, completed: newCompletedStatus, userId }, idTask);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-row w-full p-1 m-1 bg-slate-200 items-center justify-between rounded-md">
      <div className="flex flex-row w-3/5 space-x-2 items-center">
        <input
          type="checkbox"
          checked={completedTask}
          onChange={handleCheckboxChange}
          className="checkbox checkbox-lg checkbox-info"
        />
        <span>{title}</span>
      </div>
      <DeleteTask
      id={idTask}/>
    </div>
  );
}
