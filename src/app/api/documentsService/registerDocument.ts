import { createApiInstances } from '@/app/util/baseURL';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';

interface DocumentData {
  file: File; // Adicionando um campo para o arquivo
}

export const registerDocument = async (documentData: DocumentData) => {
  const { apiLogin, apiInstance } = await createApiInstances();

  const formData = new FormData();
  formData.append('file', documentData.file);

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

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      const documentData: DocumentData = { file };
      try {
        const response = await registerDocument(documentData);
        console.log('File uploaded successfully:', response);
      } catch (error) {
        console.error('File upload failed:', error);
      }
    }
  };
}
