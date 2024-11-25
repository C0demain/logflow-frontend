'use client'

import { deleteVehicleById } from "@/app/api/vehicleService/deleteVehicle"; // Certifique-se de ter a função de API correspondente

import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import DeleteButton from "../Shared/deleteButton";
import useToasts from "@/hooks/useToasts";

interface DeleteVehicleProps {
  id: string;
}

export const DeleteVehicle: React.FC<DeleteVehicleProps> = ({ id }) => {
  const {showToast, showToastOnReload} = useToasts()
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteVehicleById(id); // Função de API para deletar o veículo
      showToastOnReload("Veículo excluído com sucesso", 'success')
      window.location.reload();
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        showToast(error.message, 'error')
      } else {
        showToast("Ocorreu um erro inesperado. Tente novamente", 'error')
      }
    }
  };

  return (
    <DeleteButton id={id} handleDelete={handleDelete}>
      <h1 className="modal-top text-2xl">
        Deseja realmente excluir esse veículo?
      </h1>
    </DeleteButton>
  );
};
