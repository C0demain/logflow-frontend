import { completeTask } from "@/app/api/tasks/completeTask";
import { useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface TaskItemProps {
  idTask: string;
  completed: boolean;
  title: string;
  sectorName: string;
  onChecked: () => void;
}

export default function TaskItem({ idTask, completed, title, sectorName, onChecked}: TaskItemProps) {
  const params = useParams<{userId: string, orderId: string}>();
  const [completedTask, setCompletedTask] = useState<boolean>(completed);
  
  const handleCheckboxChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newCompletedStatus = e.target.checked;
    setCompletedTask(newCompletedStatus);
    try {
      await completeTask(idTask);
      onChecked()
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
          className="checkbox checkbox-lg checkbox-info transition"
        />
        <span>{title}</span>
      </div>
    </div>
  );
}