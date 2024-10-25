import { createApiInstances } from '@/app/util/baseURL';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';

interface DocumentData {
  filename: string
  file: File; 
  userId: string | undefined,
  // Adicionando um campo para o arquivo
}

export const registerDocument = async (documentData: DocumentData) => {
  const { apiLogin, apiInstance } = await createApiInstances();

  const formData = new FormData();
  formData.append('file', documentData.file);
  if(documentData.userId){formData.append('userId', documentData.userId)}

  try {
    const response = await apiInstance.post('/api/v1/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Certifique-se de que o tipo de conteúdo está correto
      },
    });
    console.log(response)
    return response.data; // Ajuste com base na estrutura real da resposta
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 400) {
        console.log(error)
        throw new AxiosError(error.response.data?.message);
      }
    } else {
      throw new AxiosError('Erro ao conectar ao servidor. Tente novamente');
    }
  }
};