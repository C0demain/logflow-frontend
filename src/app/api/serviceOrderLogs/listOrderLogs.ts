import { createApiInstances } from "@/app/util/baseURL";
import { Sector } from "@/enums/sector";
import axios, { AxiosError } from "axios";

export const listServiceOrderLogs = async (
  id?: string,
  serviceOrderId?: string,
  changedTo?: Sector
) => {
  const { apiInstance } = await createApiInstances();

  try {
    const url = "/api/v1/service-order/history";

    const response = await apiInstance.get(url, {
      params: {
        id,
        serviceOrderId,
        changedTo,
      },
    });

    return response.data.logs;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 400)
        throw new AxiosError(error.response.data?.message);
    } else {
      throw new AxiosError("Erro ao conectar ao servidor. Tente novamente");
    }
  }
};
