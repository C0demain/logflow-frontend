import { createApiInstances } from "@/app/util/baseURL";
import axios from "axios";

export const listVehicles = async (
  plate: string = "",    // Valor padrão
  model: string = "",    // Valor padrão
  brand: string = "",    // Valor padrão
  year: number | null = null,      // Alterado para null
  autonomy: number | null = null,  // Alterado para null
  status: string = ""    // Valor padrão
) => {
  const { apiInstance } = await createApiInstances();

  try {
    let url = "/api/v1/vehicles";

    // Construção de filtros para os parâmetros de busca
    const plateFilter = plate ? `plate=${plate}` : "";
    const modelFilter = model ? `model=${model}` : "";
    const brandFilter = brand ? `brand=${brand}` : "";
    const yearFilter = year ? `year=${year}` : "";  // Alterado para null
    const autonomyFilter = autonomy ? `autonomy=${autonomy}` : "";  // Alterado para null
    const statusFilter = status ? `status=${status}` : "";

    // Filtrando os parâmetros e concatenando-os com "&"
    const queryParams = [
      plateFilter,
      modelFilter,
      brandFilter,
      yearFilter,
      autonomyFilter,
      statusFilter,
    ]
      .filter((e) => e !== "")  // Filtra os parâmetros vazios
      .join("&");

    url += queryParams ? "?" + queryParams : "";  // Se houver filtros, adiciona à URL

    // Requisição à API para listar veículos com filtros
    const response = await apiInstance.get(url);
    return response.data;
  } catch (error) {
    console.log(error)
    if (axios.isAxiosError(error)) {
      throw new Error("Erro ao listar veículos: " + error.response?.data.message);
    } else {
      throw new Error("Erro ao listar veículos: " + (error as Error).message);
    }
  }
};
