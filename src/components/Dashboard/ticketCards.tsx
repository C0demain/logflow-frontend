import React, { useContext, useEffect, useState } from "react";
import { DateFilterContext } from "@/app/context/dashboard";
import { getOrdersStats } from "@/app/api/dashboardService/getOrdersStats";
import Loading from "@/app/loading";

const TicketCards: React.FC = () => {
  const {startDate, endDate} = useContext(DateFilterContext)
  const [loading, setLoading] = useState<boolean>(true);
  const [totalTicket, setTotalTicket] = useState<number>()
  const [averageTicket, setAverageTicket] = useState<number>()

  const fetchStats = async () => {
    try{

      const response = await getOrdersStats({dateFrom: startDate, dateTo: endDate})
      setTotalTicket(Number(response.totalValue))
      setAverageTicket(Number(response.averageValue))
      setLoading(false)
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [startDate, endDate]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
      {/* Card para Ticket Total */}
      <div className="card bg-base-100 shadow-xl w-full">
        <div className="card-body">
          <h2 className="card-title">Ticket Total</h2>
          {loading ? <Loading/> : <p className="text-2xl mt-2">R$ {totalTicket?.toFixed(2)}</p>}
        </div>
      </div>

      {/* Card para Ticket Médio */}
      <div className="card bg-base-100 shadow-xl w-full">
        <div className="card-body">
          <h2 className="card-title">Ticket Médio</h2>
          {loading ? <Loading/> : <p className="text-2xl mt-2">R$ {averageTicket?.toFixed(2)}</p>}
        </div>
      </div>
    </div>
  );
};

export default TicketCards;
