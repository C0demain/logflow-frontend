import { useEffect, useState } from "react";
import Select from "react-select";
import { listVehicles } from "@/app/api/vehicleService/listVehicles"; // Função para listar veículos

type propsType = {
  controlState: any;   // O estado controlado externamente, de um componente pai
  setControlState: React.Dispatch<React.SetStateAction<any>>;  // Função para atualizar o estado do componente pai
  className?: string;
};

export const SelectVehicles = ({ controlState, setControlState, className }: propsType) => {
  const [vehicleOpt, setVehicleOpt] = useState<any[]>([]);

  // Função para obter os veículos da API
  const getVehicles = async () => {
    try {
      const response = await listVehicles(); // Chama a API para listar os veículos
      const options = response.map((vehicle: { id: any; model: any;}) => ({
        value: vehicle.id, // O valor do select será o ID do veículo
      }));
      setVehicleOpt(options);
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
    }
  };

  // Executa a função de busca ao carregar o componente
  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <Select
      options={vehicleOpt} // As opções a serem mostradas no select
      value={controlState} // Valor selecionado atualmente
      onChange={(e) => setControlState(e)} // Atualiza o estado quando um item for selecionado
      className={className || "text-black"} // Classe personalizada ou padrão
      classNamePrefix="custom-select" // Prefixo para a classe customizada
      placeholder="Selecione um veículo"
      isClearable // Permite limpar a seleção
    />
  );
};
