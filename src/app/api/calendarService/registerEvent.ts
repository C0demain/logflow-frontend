import { createApiInstances } from "@/app/util/baseURL";
import axios from "axios";

interface EventData{
    title: string;
    description: string;
    start: string;
    end: string;
    allDay: boolean;
}

export const registerEvent = async (eventData: EventData) => {
  const { apiInstance } = await createApiInstances();

  try {
    const response = await apiInstance.post("/api/v1/calendar", eventData);
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        "Erro ao registrar novo evento: " + error.response?.data.message
      );
    } else {
      throw new Error(
        "Erro ao registrar novo evento: " + (error as Error).message
      );
    }
  }
};
