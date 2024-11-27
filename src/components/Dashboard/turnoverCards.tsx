import React, { useState, useEffect, useContext } from "react";
import { getTurnover } from "@/app/api/dashboardService/getTurnover";  // Importando a função getTurnover
import { DateFilterContext } from "@/app/context/dashboard";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {turnover && (
          <>
            <div className="card bg-base-100 shadow-xl w-full">
              <div className="card-body">
                <h2 className="card-title">Usuários Ativos</h2>
                <p className="text-2xl mt-2">{turnover.newUsers}</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl w-full">
              <div className="card-body">
                <h2 className="card-title">Usuários Desativados</h2>
                <p className="text-2xl mt-2">{turnover.deactivatedUsers}</p>
              </div>
            </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default TurnoverCards;
