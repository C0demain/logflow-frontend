import { getTasks, TaskData } from "@/app/api/tasks/listTasks";
import Loading from "@/app/loading";
import { useContext, useEffect, useState } from "react";
import Empty from "../Empty";
import { TaskContext } from "@/app/context/task";
import { CreateDocButton } from "../DocumentService/createDocButton";
import { ReadDocuments } from "../DocumentService/readDocuments";
import { SelectUser } from "../UserService/selectUser";
import { addCost, setdueDate, startTask, userForTask } from "@/app/api/tasks/taskUtil";
import { isAxiosError } from "axios";
import { useToast } from "@chakra-ui/react/toast";
import { FaPlus } from "react-icons/fa";
import { formatDateForInput, formatDateToBR } from "@/app/util/dateFormatter";

export const ReadUnitTask = () => {
  const [shownTask, setShownTask] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [userObj, setUserObj] = useState<any>();
  const [dueDate, setDueDate] = useState<string>("");
  const [taskCost, setTaskCost] = useState<number>(shownTask?.taskCost)
  const toast = useToast();
  const { task } = useContext(TaskContext);
  const user = shownTask?.assignedUser;

  /* Adiciona data de inicio da tarefa */
  const startTasks = async (taskId: string) => {
    try {
      const response = await startTask(taskId);
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        toast({
          status: "error",
          title: "Erro",
          description: error.message,
        });
      } else {
        toast({
          status: "error",
          title: "Erro",
          description: "Ocorreu um erro inesperado. Tente novamente",
        });
      }
    }
  };

  /* Adiciona usuário */
  const assignUser = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await userForTask(shownTask.id, { userId: userObj.value });
      await startTasks(shownTask.id);
      toast({
        status: "success",
        title: "Sucesso",
        description: "Usuário vínculado",
      });
      setUserObj("");
      return response;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast({
          status: "error",
          title: "Erro",
          description: error.message,
        });
      } else {
        toast({
          status: "error",
          title: "Erro",
          description: "Ocorreu um erro inesperado. Tente novamente",
        });
      }
    }
  };

  /* Adiciona data de previsão de fim */
  const saveDueDate = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await setdueDate(shownTask.id, { date: formatDateToBR(dueDate) });
      toast({
        status: "success",
        title: "Sucesso",
        description: "Previsão de fim atualizada",
      });
    } catch (error) {
      if (isAxiosError(error)) {
        toast({
          status: "error",
          title: "Erro",
          description: error.message,
        });
      } else {
        toast({
          status: "error",
          title: "Erro",
          description: "Ocorreu um erro inesperado. Tente novamente",
        });
      }
    }
  };

  const addTaskCost = async(event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await addCost(shownTask.id, {value: taskCost})
      toast({
        status: "success",
        title: "Sucesso",
        description: "Custo de tarefa, atualizado",
      });
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        toast({
          status: "error",
          title: "Erro",
          description: error.message,
        });
      } else {
        toast({
          status: "error",
          title: "Erro",
          description: "Ocorreu um erro inesperado. Tente novamente",
        });
      }
    }
  }

  useEffect(() => {
    if (!task) return;
    const getTask = async () => {
      try {
        const response = await getTasks('', '', '', '', task?.id);
        console.log(response);
        setShownTask(response.task);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    getTask();
  }, [task]);

  useEffect(()=>{
    setDueDate(formatDateForInput(shownTask?.dueDate))
  }, [shownTask?.dueDate])

  if (!shownTask) {
    return <Empty title="Selecione uma tarefa" />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-col w-full bg-white p-5 rounded-md shadow-lg space-y-4">
        <div className="flex space-x-5">
          <p className="font-bold text-lg">Titulo: {shownTask?.title}</p>
          <p className="text-lg">Setor: {shownTask?.sector}</p>
          <form onSubmit={addTaskCost} className="flex space-x-2">
            <p className="text-lg">Custo: </p>
            <input value={shownTask.taskCost} onChange={e => {setTaskCost(Number(e.target.value))}} type="number" className="input input-bordered input-sm rounded-sm"/>
            <button type="submit" className="btn btn-info btn-sm">
              Salvar
            </button>
          </form>
        </div>
        <div className="flex justify-between w-full">
          <div>
            <p>Responsável: {user?.name}</p>
            <p>Contato: {user?.email == null ? "Nenhum usuário atribuído a esta tarefa" : user.email}</p>
          </div>
          <form onSubmit={assignUser} className="flex space-x-1 items-center">
            <SelectUser controlState={[userObj, setUserObj]} dataKey={"id"} />
            <button type="submit" className="btn btn-info btn-sm">
              Salvar
            </button>
          </form>
        </div>
        <div>
          <p>Data de início: {formatDateToBR(shownTask?.startedAt)}</p>
          <form onSubmit={saveDueDate} className="flex items-center space-x-2">
            <label htmlFor="dueDate">Previsão de fim:</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="input input-sm rounded-sm input-bordered"
            />
            <button type="submit" className="btn btn-info btn-sm">
              Salvar
            </button>
          </form>
          <p>Data de fim: {formatDateToBR(shownTask?.completedAt)}</p>
        </div>
        <div className="flex flex-col justify-start">
          <p className="font-bold">Documentos</p>
          <div className="flex scale-90 justify-start items-start"><ReadDocuments taskId={shownTask?.id} userId="" /></div>
          <div className="flex items-center space-x-1">
            <CreateDocButton id={""} taskId={shownTask?.id} />
            <p>Adicionar documento</p>
          </div>
        </div>
      </div>
      <p>{JSON.stringify(shownTask)}</p>
    </>
  );
};
