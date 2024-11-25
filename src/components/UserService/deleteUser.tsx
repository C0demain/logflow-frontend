import { deleteUserById } from "@/app/api/userService/deleteUser";

import { isAxiosError } from "axios";
import DeleteButton from "../Shared/deleteButton";
import useToasts from "@/hooks/useToasts";

interface DeleteUserProps {
  id: string;
}

export const DeleteUser: React.FC<DeleteUserProps> = ({ id }) => {
  const {showToast, showToastOnReload} = useToasts()
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteUserById(id);
      showToastOnReload("Funcionário arquivado com sucesso", 'success')
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
        Deseja realmente excluir esse funcionário?
      </h1>
    </DeleteButton>
  );
};
