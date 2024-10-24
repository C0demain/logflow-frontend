import { AiFillDelete } from "react-icons/ai";
import DeleteButton from "../deleteButton";

interface DeleteDocumentProps {
  id: string;
  onDelete: (id: string) => void;
}

export const DeleteDocument: React.FC<DeleteDocumentProps> = ({ id, onDelete }) => {
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <DeleteButton id={id} handleDelete={handleDelete}>
      <h1 className="modal-top text-2xl">
        Deseja realmente excluir esse documentos?
      </h1>
    </DeleteButton>
  );
};
