import { createApiInstances } from '@/app/util/baseURL';
import axios, { AxiosError } from 'axios';

// Definindo a interface para os dados do veículo
interface VehicleData {
  plate: string;
  model: string;
  brand: string;
  year: number;
  autonomy: number;
  status: string;
}

// Função para registrar um veículo
export const registerVehicle = async (vehicleData: VehicleData) => {
  const { apiInstance } = await createApiInstances();

  try {
    // Enviando os dados do veículo via POST para o endpoint /api/v1/vehicles
    const response = await apiInstance.post('/api/v1/vehicles', vehicleData);
    return response.data; // Retorna os dados da resposta, que podem ser os dados do veículo registrado
  } catch (error: unknown) {
    // Verificando se o erro é de uma requisição HTTP com Axios
    if (axios.isAxiosError(error)) {
      // Se o erro for de status 400 (Bad Request), lançamos um erro com a mensagem do servidor
      if (error?.response?.status === 400) {
        throw new AxiosError(error.response.data?.message);
      }
      // Caso contrário, retornamos o erro genérico da resposta
      throw new AxiosError('Erro ao registrar veículo: ' + error.response?.data?.message);
    } else {
      // Se o erro não for relacionado ao Axios (erro de conexão ou outro), lançamos um erro genérico
      throw new AxiosError('Erro ao conectar ao servidor. Tente novamente.');
    }
  }
};
