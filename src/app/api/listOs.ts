import axios from "axios"

export const listOs = async() => {
    try {
        const response = await axios.get(`http://localhost:8000/api/v1/service-order/`)
        return response.data.orders
    } catch (error) {
        if (axios.isAxiosError(error)) {
      throw new Error('Erro ao listar ordem de serviço: ' + error.response?.data.message);
    } else {
      throw new Error('Erro ao listar ordem de serviço: ' + (error as Error).message);
    }
    }
}