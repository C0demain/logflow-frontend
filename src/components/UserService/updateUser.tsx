import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { updateUserById } from "@/app/api/userService/updateUser"; // Função de atualização

interface EditUserProps {
    id: string;
    name: string;
    email: string;
    role: string;
    sector: string;
}

export const EditUser: React.FC<EditUserProps> = ({ id, name, email, role, sector }) => {
    const [formData, setFormData] = useState({
        name,
        email,
        role,
        sector,
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);

        try {
            await updateUserById(id, formData);
            window.location.reload(); // Atualizar a página após a edição
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('Erro desconhecido ao editar funcionário');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input type="checkbox" id={`edit${id}`} className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box bg-white">
                    <div className="modal-top mb-5">
                        <h1 className="text-2xl">Editar Funcionário</h1>
                    </div>

                    {errorMessage && <div className="text-red-500">{errorMessage}</div>}

                    <form onSubmit={handleSubmit} className="modal-middle space-y-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-gray-200 rounded-md border border-black w-full"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-gray-200 rounded-md border border-black w-full"
                            required
                        />
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="bg-gray-200 rounded-md border border-black w-full"
                            required
                        >
                            <option value="MANAGER">Gerente</option>
                            <option value="EMPLOYEE">Funcionário</option>
                        </select>
                        <select
                            name="sector"
                            value={formData.sector}
                            onChange={handleChange}
                            className="bg-gray-200 rounded-md border border-black w-full"
                            required
                        >
                            <option value="ADMINISTRATIVO">ADMINISTRATIVO</option>
                            <option value="COMERCIAL">COMERCIAL</option>
                            <option value="FINANCEIRO">FINANCEIRO</option>
                        </select>

                        <button type="submit" className="btn bg-blue-600 text-white">
                            Salvar Alterações
                        </button>
                    </form>

                    <div className="modal-action">
                        <label htmlFor={`edit${id}`} className="btn bg-blue-600 text-white">Fechar</label>
                    </div>
                </div>
            </div>
        </div>
    );
};
