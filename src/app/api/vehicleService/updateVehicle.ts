import axios, { AxiosError } from "axios";
import { createApiInstances } from "@/app/util/baseURL";
import vehicleUpdateInterface from "@/interfaces/vehicleUpdateInterface";

export const updateVehicleById = async (
  id: string,
  vehicleData: vehicleUpdateInterface
) => {
  const { apiInstance } = await createApiInstances();

  try {
    const response = await apiInstance.put(`/api/v1/vehicles/${id}`, vehicleData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if(error?.response?.status === 400)
      throw new AxiosError(error.response.data?.message)
    } else {
      throw new AxiosError('Erro ao conectar ao servidor. Tente novamente');
    }
  }
};
