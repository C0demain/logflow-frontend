import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getCompletedOrders } from "@/app/api/chartService/getCompletedOrders";
import { ApexOptions } from "apexcharts";

const CompletedOrdersChart: React.FC = () => {
  const [chartOptions, setChartOptions] = useState<ApexOptions>({
    chart: {
      id: "completed-orders-chart",
      background: "#ffffff",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [],
      labels: {
        rotate: -45,
        style: {
          fontSize: "10px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "10px",
        },
      },
    },
    title: {
      text: "Ordens de Serviço Concluídas por Período",
      align: "center",
      style: {
        fontSize: "14px",
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "70%",
        dataLabels: {
          position: "center",
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "10px",
        colors: ["#333"],
      },
      offsetY: 0,
    },
    tooltip: {
      enabled: true,
    },
    grid: {
      padding: {
        top: 20,
        bottom: 10,
      },
    },
  });

  const [chartSeries, setChartSeries] = useState<{ name: string; data: number[] }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompletedOrders("2024-01-01", "2024-12-31");

        const sortedData = data.sort((a, b) => {
          const [yearA, monthA] = a.month.split("-").map(Number);
          const [yearB, monthB] = b.month.split("-").map(Number);

          if (yearA !== yearB) {
            return yearA - yearB;
          }
          return monthA - monthB;
        });

        const months = sortedData.map((item) => item.month);
        const completedCounts = sortedData.map((item) => item.completedOrders);

        setChartOptions((prevOptions: ApexOptions) => ({
          ...prevOptions,
          xaxis: {
            categories: months,
          },
        }));

        setChartSeries([
          {
            name: "Concluídas por Mês",
            data: completedCounts,
          },
        ]);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center w-full  md:p-6 lg:p-8 overflow-x-hidden">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-4">
        Dashboard de Ordens Concluídas
      </h1>
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
  );
};

export default CompletedOrdersChart;
