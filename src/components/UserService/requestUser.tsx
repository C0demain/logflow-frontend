import { DeleteUser } from "@/components/UserService/deleteUser";
import { EditUser } from "@/components/UserService/updateUser"; // Novo componente de edição
import { FaEdit } from "react-icons/fa"; // Ícone de edição

interface RequestUserProps {
    name: string;
    email: string;
    role: string;
    sector: string;
    id: string;
    onDelete: (id: string) => void; // Adicionando a prop onDelete
}

const RequestUser: React.FC<RequestUserProps> = ({ name, email, role, sector, id, onDelete }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-700">Email: {email}</p>
        <p className="text-gray-700">Cargo: {role}</p>
        <p className="text-gray-700">Setor: {sector}</p>
      </div>

      {/* Ícones de Editar e Excluir */}
      <div className="flex space-x-4 ml-auto mr-20">
        {/* Ícone de Editar */}
        <label htmlFor={`edit${id}`} className="btn btn-md bg-gray-100 text-black flex items-center hover:bg-gray-300">
          <FaEdit />
        </label>

        {/* Ícone de Excluir */}
        <DeleteUser id={id} onDelete={onDelete} /> {/* Passando a função onDelete */}
      </div>

      {/* Modal de Edição */}
      <EditUser id={id} name={name} email={email} role={role} sector={sector} />
    </div>
  );
};

export default RequestUser;
