import { createApiInstances } from "@/app/util/baseURL";
import EventData from "@/interfaces/eventData";
import axios from "axios";


export const registerEvent = async (eventData: EventData) => {
  const { apiInstance } = await createApiInstances();

  try {
    const response = await apiInstance.post("/api/v1/calendar", eventData);
    return response.data;
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
