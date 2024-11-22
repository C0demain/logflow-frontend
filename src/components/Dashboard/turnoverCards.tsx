import { DateFilterContext } from "@/app/context/dashboard";
import React, { useState, useCallback, useEffect, useContext } from "react";

// Tipagem para os dados de turnover
interface TurnoverData {
    ratio: number;
    difference: number;
    newUsers: number;
    deactivatedUsers: number;
}

const TurnoverCards: React.FC = () => {
    const [turnover, setTurnover] = useState<TurnoverData | null>(null); // Estado para armazenar os dados de turnover
    const {startDate, endDate} = useContext (DateFilterContext)

    // Função para buscar as informações de turnover
    const getTurnover = useCallback(async () => {
        if (!startDate || !endDate) return; // Verifica se as datas foram preenchidas

        try {
            // Construindo a URL com os parâmetros de data
            const url = `http://localhost:8000/api/v1/users/turnover?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`;

            // Supondo que você tenha um token de autenticação
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OWU4ODFlNS1jZmI1LTQ2Y2ItYTI1Ni00NDBjODc1Zjk2ZDYiLCJ1c2VybmFtZSI6ImpqbSIsInJvbGUiOnsiaWQiOiI5YThkMDBkMi02NjcwLTQyMzQtYTYyMS02ZGFkZmU5YzU3YjgiLCJuYW1lIjoiQWRtaW5pc3RyYWRvciIsImRlc2NyaXB0aW9uIjoiYWRtaW5pc3RyYWRvciBnZXJhbCIsInNlY3RvciI6IkRJUkVUT1JJQSJ9LCJzZWN0b3IiOiJESVJFVE9SSUEiLCJpYXQiOjE3MzIyNzc2OTQsImV4cCI6MTczMjM2NDA5NH0.d8jmOpMXaP0xNCBg52qXAaCssIyZ-916VM7NfPQmRe0"; // Substitua com o seu token real

            // Fazendo a requisição GET com o cabeçalho de autorização
            const response = await fetch(url, {
                method: "GET", // Usando o método GET
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Cabeçalho com o token
                },
            });

            if (response.ok) {
                const data = await response.json();
                const turnoverData = data.turnover; // Obtendo os dados de turnover

                // Atualizando o estado com os dados de turnover
                setTurnover(turnoverData);

            } else {
                console.error('Falha ao obter dados de turnover');
            }
        } catch (error) {
            console.error("Erro ao buscar turnover:", error);
        }
    }, [startDate, endDate]);

    useEffect(() => {
        getTurnover(); // Buscar turnover sempre que as datas mudarem
    }, [getTurnover]);

    return (
        <div className="space-y-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {turnover ? (
                    <>
                        <div className="card bg-base-100 shadow-xl w-full">
                            <div className="card-body">
                            <h2 className="card-title">Taxa de Turnover</h2>
                            <p className="text-2xl mt-2">{(turnover.ratio).toFixed(2)}%</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-xl w-full">
                            <div className="card-body">
                            <h2 className="card-title">Diferença de Usuários</h2>
                            <p className="text-2xl mt-2">{turnover.difference}</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-xl w-full">
                            <div className="card-body">
                            <h2 className="card-title">Novos Usuários</h2>
                            <p className="text-2xl mt-2">{turnover.newUsers}</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-xl w-full">
                            <div className="card-body">
                            <h2 className="card-title">Usuários Desativados</h2>
                            <p className="text-2xl mt-2">{turnover.deactivatedUsers}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="col-span-3">
                        <p>Carregando dados de turnover...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TurnoverCards;
