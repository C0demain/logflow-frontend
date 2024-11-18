'use client'

import { deleteVehicleById } from "@/app/api/vehicleService/deleteVehicle"; // Certifique-se de ter a função de API correspondente
import { useToast } from "@chakra-ui/react";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import DeleteButton from "../Shared/deleteButton";

interface DeleteVehicleProps {
  id: string;
}

export const DeleteVehicle: React.FC<DeleteVehicleProps> = ({ id }) => {
  const toast = useToast();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteVehicleById(id); // Função de API para deletar o veículo
      toast({
        status: "success",
        title: "Sucesso",
        description: "Veículo excluído com sucesso",
      });
      router.refresh();
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast({
          status: "error",
          title: "Erro",
          description: error.message,
        });
      } else {
        toast({
          status: "error",
          title: "Erro",
          description: "Ocorreu um erro inesperado. Tente novamente",
        });
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
