import { createApiInstances } from "@/app/util/baseURL";
import axios from "axios";

interface assignData{
    userId: string;
}

export const userForTask = async(taskId: string, assignData: assignData) => {
    const {  apiInstance } = await createApiInstances();

    try {
        console.log(taskId, assignData)
        const response = apiInstance.patch(`/api/v1/task/${taskId}/assign`, assignData)
        return response
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            "Erro ao atribuir usuário: " + error.response?.data.message
          );
        } else {
          throw new Error(
            "Erro ao atribuir usuário: " + (error as Error).message
          );
        }
      }
} 

export const uncompleteTask = async (id: string) => {
  const { apiInstance } = await createApiInstances();

  try {
    const response = await apiInstance.patch(`/api/v1/task/${id}/uncomplete`);
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        "Erro ao desmarcar tarefa como concluída: " + error.response?.data.message
      );
    } else {
      throw new Error(
        "Erro ao desmarcar tarefa como concluída: " + (error as Error).message
      );
    }
  }
};

export const completeTask = async (id: string) => {
    const { apiInstance } = await createApiInstances();
  try {
    const response = await apiInstance.patch(`/api/v1/task/${id}/complete`);
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        "Erro ao marcar tarefa como concluída: " + error.response?.data.message
      );
    } else {
      throw new Error(
        "Erro ao marcar tarefa como concluída: " + (error as Error).message
      );
    }
  }
};

export const startTask = async(taskId: string) => {
    const { apiInstance } = await createApiInstances();

    try {
        const response = apiInstance.patch(`/api/v1/task/${taskId}/start`)
        return response
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
              "Erro ao adicionar data de inicio: " + error.response?.data.message
            );
          } else {
            throw new Error(
              "Erro ao adicionar data de inicio: " + (error as Error).message
            );
          }
    }
}
interface DueDateData{
    date: string;
}

export const setdueDate = async(taskId: string, dueDateData:DueDateData) => {
    const {apiInstance} = await createApiInstances();
    console.log(dueDateData)
    try{
        const response = apiInstance.patch(`/api/v1/task/${taskId}/dueDate`, dueDateData);
        return response
    } catch(error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
              "Erro ao adicionar data de previsão: " + error.response?.data.message
            );
        } else {
            throw new Error(
              "Erro ao adicionar data de previsão: " + (error as Error).message
            );
        }
    }
}

