import axios from 'axios';
interface User {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (user: User) => {
  try {

    const response = await axios.post('http://localhost:8000/api/v1/users', user);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {

      return error.response.data;
    } else {
      return { message: 'Erro ao registrar o usuário.' };
    }
  }
};
