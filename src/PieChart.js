import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import fetchCryptoData from "./fetchCryptoData";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#FF69B4"];

const PieChartComponent = ({data}) => {
  // Calculate the total sum of prices for calculating percentage distribution
  const totalSum = data.reduce((sum, dataPoint) => sum + dataPoint.price, 0);

  // Create data for the pie chart with percentage distribution
  const pieData = data.map((dataPoint) => ({
    name: dataPoint.date,
    value: (dataPoint.price / totalSum) * 100,
  }));

  return (
    <div className="mb-4">
      <h2>Pie Chart</h2>
      <PieChart width={600} height={300}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={pieData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
