'use client'

import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { updateVehicleById } from "@/app/api/vehicleService/updateVehicle"; // Função para atualizar o veículo

import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import useToasts from "@/hooks/useToasts";

interface EditVehicleProps {
    id: string;
    model: string;
    brand: string;
    plate: string;
    year: number;
    autonomy: number;
    status: string;
}

const vehicleStatusOptions = ["Disponível", "Em Uso"]; // Opções de status

export const EditVehicle: React.FC<EditVehicleProps> = ({
    id, model, brand, plate, year, autonomy, status
}) => {
    const [formData, setFormData] = useState({
        model,
        brand,
        plate,
        year: Number(year),    // Convertendo para number
        autonomy: Number(autonomy), // Convertendo para number
        status
    });
    const [loading, setLoading] = useState(false);
    const {showToast, showToastOnReload} = useToasts()
    const router = useRouter();

    // Função para manipular as mudanças nos campos do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Se o campo for "year" ou "autonomy", converta para número
        if (name === "year" || name === "autonomy") {
            setFormData({ ...formData, [name]: value ? Number(value) : 0 });  // Garantir que o valor é convertido para número
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Função para submeter os dados do formulário
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Aqui, passamos o formData para a função que faz a atualização do veículo
            await updateVehicleById(id, formData);
            showToastOnReload("Veículo atualizado com sucesso", 'success')
            window.location.reload();  // Atualiza a página após a edição
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                showToast(error.message, 'error')
            } else {
                showToast("Ocorreu um erro inesperado. Tente novamente", 'error')
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
                        <h1 className="text-2xl">Editar Veículo</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="modal-middle space-y-4">
                        <input
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                            placeholder="Modelo"
                        />
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                            placeholder="Marca"
                        />
                        <input
                            type="text"
                            name="plate"
                            value={formData.plate}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                            placeholder="Placa"
                        />
                        <input
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                            placeholder="Ano"
                        />
                        <input
                            type="number"
                            name="autonomy"
                            value={formData.autonomy}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                            placeholder="Autonomia (km)"
                        />
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                            required
                        >
                            {vehicleStatusOptions.map((statusOption) => (
                                <option key={statusOption} value={statusOption}>
                                    {statusOption}
                                </option>
                            ))}
                        </select>

                        <button type="submit" className="btn bg-blue-600 text-white">
                            Salvar Alterações
                        </button>
                    </form>

                    <div className="modal-action">
                        <label htmlFor={`edit${id}`} className="absolute top-2 right-2 cursor-pointer text-lg">✕</label>
                    </div>
                </div>
            </div>
        </div>
    );
};
