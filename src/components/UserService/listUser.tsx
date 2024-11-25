import React, { useState, useCallback, useEffect } from "react";
import { DeleteUser } from "@/components/UserService/deleteUser";
import { EditUser } from "@/components/UserService/updateUser";
import Loading from "@/app/loading";
import { listUsers } from "@/app/api/userService/listUser";
import { FaEdit, FaFileAlt } from "react-icons/fa";
import { deleteUserById } from "@/app/api/userService/deleteUser";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SelectSector from "@/components/Selects/SelectSector";
import { SelectRole } from "@/components/Selects/SelectRole";

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
    const [sectorFilter, setSectorFilter] = useState<string>();
    const [roleFilter, setRoleFilter] = useState<string>('');
    const router = useRouter();

    const getUsers = useCallback(async () => {
        try {
            const response = await listUsers({ sector: sectorFilter, roleId: roleFilter });
            setData(response);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    }, [sectorFilter, roleFilter]);

    useEffect(() => {
        getUsers(); // Obter os usuários
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
        <div>
            {/* Seção de Listagem de Usuários */}
            <div className="overflow-x-auto">
                <div className="flex flex-row space-x-2 mb-6 items-center justify-between bg-white p-3 rounded-md">
                    <div className="flex flex-row items-center space-x-2">
                        <p className="text-lg">Setor</p>
                        <SelectSector controlState={[sectorFilter, setSectorFilter]} />
                    </div>
                    {sectorFilter && (
                        <div className="flex flex-row items-center space-x-2">
                            <p className="text-lg">Função</p>
                            <SelectRole sector={String(sectorFilter)} controlState={[roleFilter, setRoleFilter]} />
                        </div>
                    )}
                    <button className="btn btn-outline-primary" onClick={() => setSectorFilter("")}>Limpar</button>
                </div>
                <table className="table w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-blue-400 text-white rounded-t-lg">
                        <tr className="rounded-t-bg">
                            <th className="text-lg px-4 py-2 rounded-tl-lg">Nome</th>
                            <th className="text-lg px-4 py-2">Email</th>
                            <th className="text-lg px-4 py-2">Cargo</th>
                            <th className={`text-lg px-4 py-2 ${!autorizado && 'rounded-tr-lg'}`}>Setor</th>
                            {autorizado && <th className="text-lg px-4 py-2 rounded-tr-lg">Ações</th>}
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
        </div>
    );
};
