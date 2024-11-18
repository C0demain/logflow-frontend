import React, { useState, useCallback, useEffect } from "react";
import { DeleteVehicle } from "@/components/VehiclesService/deleteVehicles"; // Componente de exclusão de veículo
import { EditVehicle } from "@/components/VehiclesService/updateVehicles"; // Componente de edição de veículo
import Loading from "@/app/loading"; // Componente de carregamento
import { listVehicles } from "@/app/api/vehicleService/listVehicles"; // Função para listar veículos
import { FaEdit, FaFileAlt } from "react-icons/fa"; // Ícones para as ações
import Link from "next/link";

interface VehicleData {
    id: string;
    model: string;
    brand: string;
    plate: string;
    year: number;
    autonomy: number;
    status: string;
}

interface ReadVehiclesProps {
    autorizado: boolean;
}

export const ReadVehicles: React.FC<ReadVehiclesProps> = ({ autorizado }) => {
    const [data, setData] = useState<VehicleData[]>([]);  // Inicializando como array vazio
    const [loading, setLoading] = useState(true);
    

    // Função para buscar os veículos
    const getVehicles = useCallback(async () => {
        try {
            const response = await listVehicles();  
            setData(response)// Chama a função para listar veículos
            // Certifique-se de que a resposta seja um array
            if (Array.isArray(response.vehicles)) {
                setData(response.vehicles);  // Atualiza os dados apenas se for um array
            } else {
                console.error("Resposta da API não é um array", response.vehicles);
                setData([]);  // Caso não seja array, inicializa como array vazio
            }
        } catch (error) {
            console.error("Erro ao buscar veículos:", error);
            setData([]);  // Caso haja erro, inicializa como array vazio
        } finally {
            setLoading(false);
        }
    }, []);

    // Chama a função para carregar os veículos quando o componente for montado
    useEffect(() => {
        getVehicles();
    }, [getVehicles]);

    // Exibe o componente de carregamento enquanto os dados estão sendo recuperados
    if (loading) {
        return <Loading />;
    }

    return (
        <div className="overflow-x-auto">
            <table className="table w-full bg-white shadow-md rounded-lg">
                <thead className="bg-blue-400 text-white rounded-t-lg">
                    <tr>
                        <th className="text-lg px-4 py-2 rounded-tl-lg">Modelo</th>
                        <th className="text-lg px-4 py-2">Marca</th>
                        <th className="text-lg px-4 py-2">Placa</th>
                        <th className="text-lg px-4 py-2">Ano</th>
                        <th className="text-lg px-4 py-2">Autonomia</th>
                        <th className="text-lg px-4 py-2">Status</th>
                        {autorizado && <th className="text-lg px-4 py-2 rounded-tr-lg">Ações</th>}
                    </tr>
                </thead>
                <tbody className="text-gray-700 text-lg">
                    {
                        data.map((vehicle) => (
                            <tr key={vehicle.id} className="hover:bg-gray-100">
                                <td className="px-4 py-3">{vehicle.model}</td>
                                <td className="px-4 py-3">{vehicle.brand}</td>
                                <td className="px-4 py-3">{vehicle.plate}</td>
                                <td className="px-4 py-3">{vehicle.year}</td>
                                <td className="px-4 py-3">{vehicle.autonomy} km</td>
                                <td className="px-4 py-3">{vehicle.status}</td>
                                {autorizado && (
                                    <td className="flex justify-center space-x-4 px-4 py-3">
                                        <label htmlFor={`edit${vehicle.id}`} className="btn btn-md bg-gray-100 text-black flex items-center hover:bg-gray-300">
                                            <FaEdit />
                                        </label>
                                        <DeleteVehicle id={vehicle.id} />
                                        <EditVehicle id={vehicle.id} model={vehicle.model} brand={vehicle.brand} plate={vehicle.plate} year={vehicle.year} autonomy={vehicle.autonomy} status={vehicle.status} />
                                    </td>
                                )}
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};
