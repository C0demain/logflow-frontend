import React, { useState, useEffect, useContext } from "react";
import { getTurnover } from "@/app/api/dashboardService/getTurnover";  // Importando a função getTurnover
import { DateFilterContext } from "@/app/context/dashboard";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import { FaPersonWalkingArrowLoopLeft } from "react-icons/fa6";
import { FaBalanceScale } from "react-icons/fa";

const TurnoverCards: React.FC = () => {
  const { startDate, endDate } = useContext(DateFilterContext);
  const [turnover, setTurnover] = useState<any>(null);  // Agora 'turnover' pode ser de qualquer tipo
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar dados de turnover
  const fetchTurnover = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getTurnover({ startDate, endDate });  // Chama a função que retorna os dados
      setTurnover(data);  // Atualiza o estado com os dados retornados
    } catch (err) {
      setError("Erro ao carregar dados de turnover.");
    } finally {
      setLoading(false);  // Finaliza o carregamento
    }
  };

  useEffect(() => {
    fetchTurnover();  // Faz a requisição sempre que as datas mudarem
  }, [startDate, endDate]);

  if (loading) return <div>Carregando dados de turnover...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-6">
        {turnover && (
          <>
            <div className="card bg-base-100 shadow-xl w-full">
              <div className="card-body">
                <h1 className="card-title">Funcionários</h1>
                <div className="grid grid-cols-2 sm:grid-cols-4">
                  <div className="mb-5 sm:mb-0">
                    <h2 className="card-title">Entraram</h2>
                    <p className="text-2xl mt-2 flex items-center gap-2 text-green-600"><FaArrowUp/>{turnover.newUsers}</p>
                  </div>
                  <div className="mb-5 sm:mb-0">
                    <h2 className="card-title">Saíram</h2>
                    <p className="text-2xl mt-2 flex items-center gap-2 text-red-600"><FaArrowDown/>{turnover.deactivatedUsers}</p>
                  </div>
                  <div>
                    <h2 className="card-title">Turnover</h2>
                    <p className="text-2xl mt-2 flex items-center gap-2"><FaPersonWalkingArrowLoopLeft />{(turnover.ratio).toFixed(2)}%</p>
                  </div>
                  <div>
                    <h2 className="card-title">Diferença</h2>
                    <p className="text-2xl mt-2 flex items-center gap-2"><FaBalanceScale />{turnover.difference}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
  );
};

export default TurnoverCards;
