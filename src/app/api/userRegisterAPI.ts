import axios from 'axios';

interface User {
  name: string;
  email: string;
  password: string;
}

// Função que faz a requisição para o backend
export const registerUser = async (user: User) => {
  try {
    // Supondo que o backend esteja rodando em 'http://localhost:5000/api/register'
    const response = await axios.post('http://localhost:8000/api/v1/users', user);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Se houver erro na resposta da API, retornamos a mensagem do backend
      return error.response.data;
    } else {
      return { message: 'Erro ao registrar o usuário.' };
    }
  }
};
