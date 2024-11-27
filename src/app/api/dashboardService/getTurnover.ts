import { createApiInstances } from "@/app/util/baseURL";
import axios, { AxiosError } from "axios";

interface TurnoverFilters {
  startDate?: string | Date;
  endDate?: string | Date;
}

export const getTurnover = async (filters?: TurnoverFilters): Promise<any> => {
  const { apiInstance } = await createApiInstances();

  // Ajustando os filtros se as datas estiverem vazias
  if (filters?.startDate === "") {
    filters.startDate = undefined;
  }

  if (filters?.endDate === "") {
    filters.endDate = undefined;
  }

  try {
    const response = await apiInstance.get("/api/v1/users/turnover", {
      params: {
        startDate: filters?.startDate,
        endDate: filters?.endDate,
      },
    });

    // Aqui retornamos os dados do turnover que vêm na resposta
    return response.data.turnover;
  } catch (error) {
    // Se o erro for do tipo Axios, ele será tratado com uma mensagem customizada
    if (axios.isAxiosError(error)) {
      throw new AxiosError(
        error.response?.data?.message || "Erro ao carregar dados de turnover"
      );
    } else {
      // Se o erro não for do tipo Axios, um erro genérico de conexão é lançado
      throw new AxiosError("Erro ao conectar ao servidor. Tente novamente.");
    }
  }
};
