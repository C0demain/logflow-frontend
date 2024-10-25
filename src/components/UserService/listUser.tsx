import React, { useState, useCallback, useEffect } from "react";
import { DeleteUser } from "@/components/UserService/deleteUser";
import { EditUser } from "@/components/UserService/updateUser"; // Novo componente de edição
import Loading from "@/app/loading";
import { listUsers } from "@/app/api/userService/listUser";
import { FaEdit, FaFileAlt } from "react-icons/fa"; // Importando o ícone de documento
import { deleteUserById } from "@/app/api/userService/deleteUser";
import { useRouter } from "next/navigation"; // Importando useRouter para redirecionamento
import Link from "next/link";

interface UserData {
    id: string;
    name: string;
    email: string;
    role: string;
    sector: string;
}

interface ReadUsersProps {
    autorizado: boolean;
}

export const ReadUsers: React.FC<ReadUsersProps> = ({ autorizado }) => {
    const [data, setData] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter(); // Inicializando o router

    const getUsers = useCallback(async () => {
        try {
            const response = await listUsers();
            setData(response);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const handleDelete = async (userId: string) => {
        try {
            await deleteUserById(userId);
            setData((prevData) => prevData.filter(user => user.id !== userId));
        } catch (error) {
            console.error("Erro ao deletar funcionário:", error);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="overflow-x-auto">
            <table className="table w-full bg-white shadow-md rounded-lg">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="text-lg px-4 py-2">Nome</th>
                        <th className="text-lg px-4 py-2">Email</th>
                        <th className="text-lg px-4 py-2">Cargo</th>
                        <th className="text-lg px-4 py-2">Setor</th>
                        {autorizado && <th className="text-lg px-4 py-2">Ações</th>}
                    </tr>
                </thead>
                <tbody className="text-gray-700 text-lg">
                    {data.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-100">
                            <td className="px-4 py-3">{user.name}</td>
                            <td className="px-4 py-3">{user.email}</td>
                            <td className="px-4 py-3">{user.role}</td>
                            <td className="px-4 py-3">{user.sector}</td>
                            {autorizado && (
                                <td className="flex justify-center space-x-4 px-4 py-3">
                                    <Link
                                        href={`/auth/documents/${user.id}`}
                                        className="btn btn-md bg-gray-100 text-black flex items-center hover:bg-gray-300"
                                    >
                                        <FaFileAlt />
                                    </Link>
                                    <label htmlFor={`edit${user.id}`} className="btn btn-md bg-gray-100 text-black flex items-center hover:bg-gray-300">
                                        <FaEdit />
                                    </label>
                                    <DeleteUser id={user.id} />
                                    <EditUser id={user.id} name={user.name} email={user.email} role={user.role} sector={user.sector} />
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
