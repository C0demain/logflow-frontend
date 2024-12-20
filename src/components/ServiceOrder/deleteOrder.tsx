import { deleteOsById } from "@/app/api/serviceOrder/deleteOrder";

import DeleteButton from "../Shared/deleteButton";
import useToasts from "@/hooks/useToasts";

interface DeleteOrderProps {
  id: string;
}

export const DeleteOrder: React.FC<DeleteOrderProps> = ({ id }) => {
  const {showToast, showToastOnReload} = useToasts()
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteOsById(id);
      showToastOnReload("Ordem de serviço arquivada com sucesso", 'success')
      window.location.reload();
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
