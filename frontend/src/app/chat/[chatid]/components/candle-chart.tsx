import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export const options = {
  legend: "none",
  backgroundColor: {
    fill: "#1a1a1a",
    stroke: "#1a1a1a",
    strokeWidth: 0,
  },
  candlestick: {
    fallingColor: { strokeWidth: 1, fill: "#FF4444", stroke: "#FF4444" },
    risingColor: { strokeWidth: 1, fill: "#00C853", stroke: "#00C853" },
  },
  hAxis: {
    textStyle: { color: "#808080" },
    gridlines: { color: "#333333" },
  },
  vAxis: {
    textStyle: { color: "#808080" },
    gridlines: { color: "#333333" },
  },
  chartArea: {
    width: "90%",
    height: "80%",
    backgroundColor: {
      fill: "#1a1a1a",
      rx: 10,
    },
  },
};

interface CandleChartProps {
  token: string;
}

type ChartDataType = {
  prices: [number, number][];
};

const CandleChart = ({ token }: CandleChartProps) => {
  const [chartData, setChartData] = useState<ChartDataType | null>(null);

  useEffect(() => {
    async function fetchChartData() {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-HegMGgBnFAC7MhLyNewUBT5f",
        },
      };

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${token}/market_chart?vs_currency=usd&days=45`,
          options
        );
        const data = await response.json();
        setChartData(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchChartData();
  }, [token]);

  const transformData = (): (string | number)[][] => {
    if (!chartData?.prices) return [["Date", "Low", "Open", "Close", "High"]];

    const dailyData: { [key: string]: number[] } = {};

    chartData.prices.forEach(([timestamp, price]) => {
      const date = new Date(timestamp);
      const dateKey = date.toISOString().split("T")[0];

      if (!dailyData[dateKey]) {
        dailyData[dateKey] = [price];
      } else {
        dailyData[dateKey].push(price);
      }
    });

    const formattedData: (string | number)[][] = [
      ["Date", "Low", "Open", "Close", "High"],
    ];

    Object.entries(dailyData).forEach(([dateStr, prices]) => {
      formattedData.push([
        new Date(dateStr).toLocaleDateString(),
        Number(Math.min(...prices)),
        Number(prices[0]),
        Number(prices[prices.length - 1]),
        Number(Math.max(...prices)),
      ]);
    });

    return formattedData;
  };

  return (
    <div className="h-96 overflow-hidden bg-[#1a1a1a] w-full rounded-xl border border-[#384A61] p-2">
      <Chart
        chartType="CandlestickChart"
        width="100%"
        height="100%"
        data={transformData()}
        options={options}
      />
    </div>
  );
};

export default CandleChart;
