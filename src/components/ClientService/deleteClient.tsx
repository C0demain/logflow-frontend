import { deleteClientById } from "@/app/api/clientService/deleteClient";

import DeleteButton from "../Shared/deleteButton";
import useToasts from "@/hooks/useToasts";

interface DeleteClientProps {
  id: string;
}

export const DeleteClient: React.FC<DeleteClientProps> = ({ id }) => {
  const {showToast, showToastOnReload} = useToasts()

  const handleDelete = async (clientId: string) => {
    try {
      await deleteClientById(clientId);
      showToastOnReload("Cliente excluído com sucesso", 'success');
      window.location.reload()
    } catch (error) {
      showToast("Não foi possível excluir o cliente. Tente novamente", 'error');
    }
  };

  return (
    <DeleteButton id={id} handleDelete={handleDelete}>
      <h1 className="modal-top text-2xl">
        Deseja realmente excluir esse cliente?
      </h1>
    </DeleteButton>
  );
};
