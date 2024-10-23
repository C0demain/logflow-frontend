import { deleteUserById } from "@/app/api/userService/deleteUser";
import { useToast } from "@chakra-ui/react";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import DeleteButton from "../deleteButton";

interface DeleteUserProps {
  id: string;
}

export const DeleteUser: React.FC<DeleteUserProps> = ({ id }) => {
  const toast = useToast();
  const router = useRouter();
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteUserById(id);
      toast({
        status: "success",
        title: "Sucesso",
        description: "Funcionário arquivado com sucesso",
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
        Deseja realmente excluir esse funcionário?
      </h1>
    </DeleteButton>
  );
};
