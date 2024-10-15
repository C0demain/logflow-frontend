import { updateTask } from "@/app/api/tasks/updateTask";
import { ChangeEvent, useState } from "react";
import { DeleteTask } from "./deleteTask";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface TaskItemProps {
  idTask: string;
  completed: boolean;
  title: string;
  sectorName: string;
  onTaskCompletion: () => void;
}

export default function TaskItem({ idTask, completed, title, sectorName, onTaskCompletion: onTaskCompletion }: TaskItemProps) {
  const params = useParams<{userId: string, orderId: string}>();
  const queryClient = useQueryClient();
  const [completedTask, setCompletedTask] = useState<boolean>(completed);
  const [orderId, setOrderId] = useState<string>(params.orderId);
  const [userId, setUserId] = useState<string>(params.userId);
  
  const handleCheckboxChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newCompletedStatus = e.target.checked;
    setCompletedTask(newCompletedStatus);
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
    try {
      await updateTask({ title: title, completed: newCompletedStatus, userId, orderId, sector: sectorName.toUpperCase() }, idTask);
      onTaskCompletion();
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