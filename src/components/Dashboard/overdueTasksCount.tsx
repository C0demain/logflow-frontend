import React, { useState, useEffect } from "react";
import { getOverdueTasksCount } from "@/app/api/dashboardService/getOverdueTasksCount";

const OverdueTasksCount: React.FC = () => {
  const [overdueTasks, setOverdueTasks] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const fetchOverdueTasks = async () => {
    setLoading(true);
    setError(null);

    try {
      const count = await getOverdueTasksCount(); // Chama a função importada
      setOverdueTasks(count);
    } catch (err) {
      setError("Erro ao carregar as tarefas atrasadas.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchOverdueTasks();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="card bg-base-100 shadow-xl w-full my-4">
      <div className="card-body">
        <h2 className="card-title">Tarefas Atrasadas</h2>
        <p className="text-2xl mt-2">{overdueTasks} Tarefas Atrasadas</p>
      </div>
    </div>
  );
};

export default OverdueTasksCount;
