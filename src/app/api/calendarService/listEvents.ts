import { createApiInstances } from "@/app/util/baseURL";
import EventData from "@/interfaces/eventData";
import { calendar_v3 } from "@googleapis/calendar";
import axios from "axios";

export const listEvents = async (userId: string): Promise<calendar_v3.Schema$Event[]> => {
  const { apiInstance } = await createApiInstances();

  try {
    const response = await apiInstance.get(`/api/v1/calendar/${userId}`);
    return response.data.calendar;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Erro ao listar eventos do usuário ${userId}: ` +
          error.response?.data.message
      );
    } else {
      throw new Error(
        `Erro ao listar eventos do usuário ${userId}: ` +
          (error as Error).message
      );
    }
  }
};
