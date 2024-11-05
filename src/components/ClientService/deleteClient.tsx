import { deleteClientById } from "@/app/api/clientService/deleteClient";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import DeleteButton from "../Shared/deleteButton";

interface DeleteClientProps {
  id: string;
}

export const DeleteClient: React.FC<DeleteClientProps> = ({ id }) => {
  const toast = useToast();
  const router = useRouter();

  const handleDelete = async (clientId: string) => {
    try {
      await deleteClientById(clientId);
      toast({
        status: "success",
        title: "Sucesso",
        description: "Cliente excluído com sucesso",
      });
    } catch (error) {
      toast({
        status: "error",
        title: "Erro",
        description: "Não foi possível excluir o cliente. Tente novamente",
      });
    }
    router.refresh();
  };

  return (
    <DeleteButton id={id} handleDelete={handleDelete}>
      <h1 className="modal-top text-2xl">
        Deseja realmente excluir esse cliente?
      </h1>
    </DeleteButton>
  );
};
