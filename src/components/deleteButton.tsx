import { FaTrash } from "react-icons/fa";

export default function DeleteButton({
  children,
  id,
  circle,
  handleDelete,
}: {
  children: React.ReactNode;
  id: string;
  circle?: boolean;
  handleDelete: (id: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor={`delete${id}`}
        className={`btn btn-md ${circle ? "btn-circle" : ""} bg-gray-100 flex items-center hover:bg-red-500 hover:text-white hover:shadow-md`}
      >
        <FaTrash />
      </label>

      <input type="checkbox" id={`delete${id}`} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          {children}
          <div className="modal-action justify-center">
            <label
              htmlFor={`delete${id}`}
              className="btn hover:bg-gray-300" // Cinza claro para "Cancelar"
              style={{ backgroundColor: '#d2dbe6', color: 'black' }} // Cor cinza personalizada
            >
              Cancelar
            </label>
            <label
              htmlFor={`delete${id}`}
              onClick={() => {handleDelete(id)}}
              className="btn btn-error hover:text-white"
            >
              Excluir
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
