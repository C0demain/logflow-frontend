import { getTasks } from "@/app/api/tasks/listTasks";
import Loading from "@/app/loading";
import { useContext, useEffect, useState } from "react";
import Empty from "../Shared/Empty";
import { TaskContext } from "@/app/context/task";
import { CreateDocButton } from "../DocumentService/createDocButton";
import { ReadDocuments } from "../DocumentService/readDocuments";
import { SelectUser } from "../UserService/selectUser";
import { addCost, setdueDate, startTask, userForTask } from "@/app/api/tasks/taskUtil";
import { isAxiosError } from "axios";
import { useToast } from "@chakra-ui/react/toast";
import { formatDateForInput, formatDateToBR } from "@/app/util/dateFormatter";
import { Divider } from "@chakra-ui/react";
import { HeaderOrderService } from "../ServiceOrder/headerOrderService";
import useToasts from "@/hooks/useToasts";
import getSingleTask from "@/app/api/tasks/getSingleTask";

interface ReadUnitTaskProps{
  myTask: boolean;
}

export const ReadUnitTask = ({myTask}: ReadUnitTaskProps) => {
  const [shownTask, setShownTask] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [userObj, setUserObj] = useState<any>();
  const [dueDate, setDueDate] = useState<string>("");
  const [taskCost, setTaskCost] = useState<number>();
  const {showToast, showToastOnReload} = useToasts()
  const { task, deleteTask } = useContext(TaskContext);
  const user = shownTask?.assignedUser;

  /* Adiciona data de inicio da tarefa */
  const startTasks = async (taskId: string) => {
    try {
      const response = await startTask(taskId);
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        showToast(error.message, 'error')
      } else {
        showToast("Ocorreu um erro inesperado. Tente novamente", 'error')
      }
    }
  };

  /* Adiciona usuário */
  const assignUser = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await userForTask(shownTask.id, { userId: userObj.value });
      await startTasks(shownTask.id);
       showToast("Usuário vínculado", 'success')
      setUserObj("");
      getTask()
      return response;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        showToast(error.message, 'error')
      } else {
        showToast("Ocorreu um erro inesperado. Tente novamente", 'error')
      }
    }
  };

  /* Adiciona data de previsão de fim */
  const saveDueDate = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await setdueDate(shownTask.id, { date: formatDateToBR(dueDate) });
      showToast("Previsão de fim atualizada", 'success')
    } catch (error) {
      if (isAxiosError(error)) {
        showToast(error.message, 'error')
      } else {
        showToast("Ocorreu um erro inesperado. Tente novamente", 'error')
      }
    }
  };

  /* Adiciona custo da tarefa */
  const addTaskCost = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await addCost(shownTask.id, { value: taskCost });
      showToast("Custo de tarefa atualizado", 'success')
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        showToast(error.message, 'error')
      } else {
        showToast("Ocorreu um erro inesperado. Tente novamente", 'error')
      }
    }
  };

  const getTask = async () => {
    try {
      const fetchedTask = await getSingleTask(String(task?.id))
      setShownTask(fetchedTask);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!task) return;
    getTask();
  }, [task]);

  useEffect(() => {
    setTaskCost(shownTask?.taskCost)
    setDueDate(formatDateForInput(shownTask?.dueDate));
  }, [shownTask]);

  if (!shownTask) {
    return <Empty title="Selecione uma tarefa" />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-col w-full bg-white p-3 rounded-md shadow-lg space-y-2 relative">
        {myTask && 
        <div>
        <HeaderOrderService orderId={shownTask.serviceOrder.id}/>
        <Divider/>
        </div>}
        <div className="flex flex-col sm:flex-row sm:space-x-5 w-full justify-between">
          <div>
            <p className="font-bold text-lg w-full">Titulo: {shownTask?.title}</p>
            <p className="text-lg">Setor: {shownTask?.sector}</p>
          </div>
          <form onSubmit={addTaskCost} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-1/2">
            <label htmlFor="taskCost" className="text-lg">Custo:</label>
            <input
              value={taskCost ?? ""}
              id="taskCost"
              onChange={e => setTaskCost(Number(e.target.value))}
              type="number"
              className="input input-bordered input-sm rounded-sm w-full"
            />
            <button type="submit" className="btn btn-info btn-sm w-full sm:w-auto">
              Salvar
            </button>
          </form>
          <button
            type="button"
            onClick={e => { deleteTask(); getTask(); }}
            className="btn btn-circle btn-info btn-sm font-bold mt-2 sm:mt-0 absolute sm:relative top-0 right-0 sm:top-auto sm:right-auto mr-2 sm:mr-0"
          >
            X
          </button>
        </div>
        <Divider />
        <div className="flex flex-col sm:flex-row justify-between w-full">
          <div>
            <p>Responsável: {user?.name}</p>
            <p>Contato: {user?.email == null ? "Nenhum usuário atribuído a esta tarefa" : user.email}</p>
          </div>
          <form onSubmit={assignUser} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto items-center">
            <SelectUser controlState={[userObj, setUserObj]} dataKey={"id"} />
            <button type="submit" className="btn btn-info btn-sm w-full sm:w-auto">
              Salvar
            </button>
          </form>
        </div>
        <Divider />
        <div>
          <p>Data de início: {formatDateToBR(shownTask?.startedAt)}</p>
          <form onSubmit={saveDueDate} className="flex flex-col sm:flex-row items-center space-x-2 sm:space-x-4">
            <label htmlFor="dueDate" className="text-lg">Previsão de fim:</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="input input-sm rounded-sm input-bordered w-full sm:w-auto"
            />
            <button type="submit" className="btn btn-info btn-sm w-full sm:w-auto mt-2 sm:mt-0 mb-2 sm:mb-0">
              Salvar
            </button>
          </form>
          <p>Data de fim: {formatDateToBR(shownTask?.completedAt)}</p>
        </div>
        <Divider />
        <div className="flex flex-col justify-start">
          <p className="font-bold">Documentos</p>
          <div className="flex scale-90 justify-start items-start">
            <ReadDocuments taskId={shownTask?.id} userId="" />
          </div>
          <div className="flex flex-col sm:flex-row items-center space-x-1 sm:space-x-2">
            <CreateDocButton id={""} taskId={shownTask?.id} />
            <p>Adicionar documento</p>
          </div>
        </div>
      </div>
    </>
  );
};
