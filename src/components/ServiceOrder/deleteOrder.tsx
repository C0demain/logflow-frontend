import { deleteOsById } from "@/app/api/serviceOrder/deleteOrder";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import DeleteButton from "../Shared/deleteButton";

interface DeleteOrderProps {
  id: string;
}

export const DeleteOrder: React.FC<DeleteOrderProps> = ({ id }) => {
  const toast = useToast();
  const router = useRouter();
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteOsById(id);
      toast({
        status: "success",
        title: "Sucesso",
        description: "Ordem de serviço arquivada com sucesso",
      });
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro ao registrar ordem de serviço:", error.message);
      } else {
        console.error("Erro desconhecido ao registrar ordem de serviço");
      }
    }
  };

  return (
    <div className="flex relative">
      <DeleteButton id={id} handleDelete={handleDelete} circle={true}>
        <h1 className="text-xl mb-6">Deseja confirmar a exclusão?</h1>
      </DeleteButton>
    </div>
  );
};
