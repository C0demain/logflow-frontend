import { createApiInstances } from '@/app/util/baseURL';
import axios, { AxiosError } from 'axios';

interface SendAuthCodeData {
    code: string
    id: string
}

export const sendAuthCode = async (codeData: SendAuthCodeData) => {
  const { apiInstance } = await createApiInstances();

  try {
    const response = await apiInstance.post('/api/v1/calendar/callback', codeData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 400 || error?.response?.status === 404)
        throw new AxiosError(error.response.data?.message)
    } else {
      throw new AxiosError('Erro ao conectar ao servidor. Tente novamente');
    }
  }
};