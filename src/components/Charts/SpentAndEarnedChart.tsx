'use client'
import { ApexOptions } from "apexcharts"
import Chart from "react-apexcharts";
import { useContext, useEffect, useState } from "react"
import { getMonthlyOrders } from "@/app/api/chartService/getMonthlyOrders";
import { DateFilterContext } from "@/app/context/dashboard";
import formatMonthlyDate from "@/components/Charts/formatMonthlyDate";
import { formatDateToBR } from "@/app/util/dateFormatter";

const SpentAndEarnedChart: React.FC = () => {
    const {startDate, endDate} = useContext(DateFilterContext)
    const [chartSeries, setChartSeries] = useState<ApexAxisChartSeries>([])
    const [chartCategories, setChartCategories] = useState<string[]>([])
    const chartOptions: ApexOptions = {
        chart: {
            type: 'bar',
            
        },
        title: {
            text: startDate && endDate ? `Valores de Custo x Ganho por mês no período entre ${formatDateToBR(startDate)} e ${formatDateToBR(endDate)}` : 'Valores de Custo x Ganho por mês',
            align: "center",
            margin: 48,
            style: {
                fontSize: "1.2rem",
            }
        },

        xaxis: {categories: chartCategories}
    }

    const fetchData = async () => {
        const data = await getMonthlyOrders(startDate, endDate)

        const earned = data.map(d => d.totalValue)
        const spent = data.map(d => d.totalTaskCost)
        const months = data.map(d => formatMonthlyDate(d.month))
        
        setChartCategories(months)
        setChartSeries([{data: spent, name: 'Custo'}, {data: earned, name: 'Ganho'}])
    }

    useEffect(() => {
        fetchData()
    }, [startDate, endDate])

    return (
    <div className="flex flex-col items-center w-full  md:p-6 lg:p-8 overflow-x-hidden ">
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg p-2 sm:p-4 lg:p-4 overflow-hidden">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          width="100%"
          height={400}
        />
      </div>
    </div>
    )
}

export default SpentAndEarnedChart